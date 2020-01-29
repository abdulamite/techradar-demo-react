import React, { Component } from "react";
import axios from "axios";
import processData, { createLongPollRequest, updateQueues } from "../helpers";
import Consumer from "./Consumer";
import "./component-styles/Queue.css";

export class Queue extends Component {
  state = {
    consumers: []
  };
  componentDidMount = async () => {
    axios
      .get(
        `http://localhost:3000/qless/api/v1/employee/queues/${this.props.details.id}/spots/waiting`
      )
      .then(res => {
        let consumers = this.state.consumers;
        const xml = res.data;
        const waiting = processData(xml);
        if (waiting.queueSpots) {
          waiting.queueSpots.spot.forEach(spot => {
            consumers.push({
              id: spot.$.merchantConsumerInfoId,
              name: spot.$.lastName
                ? `${spot.$.firstName}, ${spot.$.lastName[0]}`
                : spot.$.privateName,
              wait: spot.forecastAtEnter[0]._
            });
          });
        }
        this.setState({ consumers });
      })
      .catch(err => {
        console.log(err);
      });

    setInterval(() => {
      axios
        .get(
          `http://localhost:3000/qless/api/v1/employee/queues/${this.props.details.id}/spots/waiting`
        )
        .then(res => {
          let consumers = [];
          const xml = res.data;
          const waiting = processData(xml);
          if (waiting.queueSpots) {
            waiting.queueSpots.spot.forEach(spot => {
              consumers.push({
                id: spot.$.merchantConsumerInfoId,
                name: spot.$.lastName
                  ? `${spot.$.firstName}, ${spot.$.lastName[0]}`
                  : spot.$.privateName,
                wait: spot.forecastAtEnter[0]._
              });
            });
          }
          this.setState({ consumers });
        });
    }, 3000);
  };
  render() {
    return (
      <div className="queue">
        <div className="queue-header">
          <h3>{this.props.details.description}</h3>
        </div>
        <div className="consumer-list">
          {this.state.consumers.map((consumer, index) => (
            <Consumer details={this.state.consumers[index]} key={consumer.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Queue;
