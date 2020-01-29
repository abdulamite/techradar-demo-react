import React, { Component } from "react";
import "./component-styles/NowServing.css";
import Station from "./Station";

export class NowServing extends Component {
  render() {
    return (
      <div className="summoned">
        <h2>Now Serving Customers</h2>
        <div className="summoned-consumers-list">
          {Object.keys(this.props.nowServing).map(key => (
            <Station
              key={key}
              station={key}
              spots={this.props.nowServing[key]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default NowServing;
