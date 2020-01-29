import xml2js from "xml2js";
const parseString = xml2js.parseString;

function processData(xml) {
  let data;
  parseString(xml, (err, results) => {
    if (err) {
      console.log("Could not parse XML");
      return;
    } else {
      data = results;
      return results;
    }
  });
  return data;
}

function createLongPollRequest(endpoint) {
  const longPollRequest = new XMLHttpRequest();
  longPollRequest.open("GET", endpoint, true);
  const handleStateChange = () => {
    console.log(longPollRequest.readyState);
  };
  const process = () => {
    console.log("process");
    console.log(longPollRequest.response);
    console.log(longPollRequest);
    processData(longPollRequest.response);
  };
  const handleProgress = () => {
    console.log("longPollRequest", longPollRequest.response);
    console.log(longPollRequest);
    process();
  };
  longPollRequest.onreadystatechange = handleStateChange;
  longPollRequest.addEventListener("progress", handleProgress);
  longPollRequest.send("Hello");
  return longPollRequest;
}

function updateQueues(url) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "text"; //or 'text', 'json', ect. there are other types.
  xhr.timeout = 60000; //milliseconds until timeout fires. (1 minute)
  xhr.onload = function() {
    console.log(xhr.response);
    //handle response data
  };
  xhr.ontimeout = function() {
    //if you get this you probably should try to make the connection again.
    //the browser should've killed the connection.
  };
  xhr.open("GET", url, true);
  xhr.send();
}

export { createLongPollRequest, updateQueues };
export default processData;
