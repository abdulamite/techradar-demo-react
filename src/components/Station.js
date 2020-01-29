import React, { Component } from "react";
import "./component-styles/Station.css";
import NowServingConsumer from "./NowServingConsumer";

export class Station extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.station}</h2>
        <ul>
          {this.props.spots.map((spot, index) => (
            <NowServingConsumer
              spot={spot}
              key={spot.$.merchantConsumerInfoId}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Station;
