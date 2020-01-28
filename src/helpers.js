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
    // fn(eventParse(longPollRequest.response));
  };
  const handleProgress = () => {
    console.log("longPollRequest", longPollRequest.response);
    console.log(longPollRequest);
    process();
  };
  longPollRequest.onreadystatechange = handleStateChange;
  longPollRequest.addEventListener("progress", handleProgress);
  longPollRequest.send();
  return longPollRequest;
}

export { createLongPollRequest };
export default processData;
