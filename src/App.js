import React, { Component } from "react";
import axios from "axios";
import qs from "querystring";
import processData from "./helpers";
import Header from "./components/Header";
import Queue from "./components/Queue";
import NowServing from "./components/NowServing";

export class App extends Component {
  state = {
    merchantLocation: {},
    user: {},
    wssid: "",
    queues: [],
    summoned: [],
    nowServing: {}
  };

  componentDidMount = async () => {
    // let data = await createLongPollRequest(
    //   `http://localhost:3000/qless/event/v1/employee?id=${Date.now()}`
    // );
    // console.log(data);
    // Get this wssid
    axios.get("http://localhost:3000/qless/api/v1/wssid").then(res => {
      let wssid = this.state.wssid;
      wssid = processData(res.data).wssid;
      this.setState({ wssid });
    });

    // Lets get logged in!
    await axios.post(
      "http://localhost:3000/qless/authenticator",
      qs.stringify({
        remeber: "true",
        principal: "college",
        credentails: "demo"
      })
    );

    await axios
      .get("http://localhost:3000/qless/api/v1/employee/queues")
      .then(res => {
        let queues = this.state.queues;
        const xml = res.data;
        const processedQueues = processData(xml).queues.queue;
        processedQueues.forEach(q => {
          let queueInfo = { ...q.$ };
          queueInfo.description = q.description[0];
          queues.push(queueInfo);
        });
        const activeQueues = queues.filter(q => q.state === "ACTIVE");
        this.setState({ queues: activeQueues });
      });

    let queuesIds = [];

    // generate a list of queues:
    this.state.queues.forEach(q => {
      queuesIds.push(q.id);
    });
    // Get summoned customers
    await axios
      .get(
        `http://localhost:3000/qless/api/v1/employee/queues/${queuesIds.join(
          ","
        )}/tickets/outstanding`
      )
      .then(res => {
        let summoned = this.state.summoned;
        let nowServing = this.state.nowServing;
        const xml = res.data;
        const spots = processData(xml).queueSpots.spot;
        let stations = {};
        if (spots) {
          spots.forEach(spot => {
            if (!(spot.ticketClassifier[0].description[0] in stations)) {
              stations[spot.ticketClassifier[0].description[0]] = [];
            }

            stations[spot.ticketClassifier[0].description[0]].push(spot);

            let currentSpot = { ...spot.$ };
            currentSpot.ticketClassifier =
              spot.ticketClassifier[0].description[0];
            summoned.push(currentSpot);
          });
        }
        this.setState({ nowServing: stations });
        this.setState({ summoned });
      })
      .catch(err => {
        console.log(err);
      });

    // Set up the merchantLocation
    let merchantLocation = this.state.merchantLocation;
    merchantLocation = await axios
      .get("http://localhost:3000/qless/api/v1/kiosk/locations/532")
      .then(res => {
        const xml = res.data;
        const processedLocation = processData(xml).merchantLocations
          .merchantLocation[0];
        let location = {
          ...processedLocation.$
        };
        location.description = processedLocation.description[0];
        return location;
      });
    this.setState({ merchantLocation: merchantLocation });
  };
  render() {
    return (
      <div className="App">
        <Header locationDescription={this.state.merchantLocation.description} />
        <NowServing
          summoned={this.state.summoned}
          nowServing={this.state.nowServing}
        />
        <div className="queue-continaer">
          {this.state.queues.map((queue, index) => (
            <Queue key={queue.id} details={this.state.queues[index]} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
