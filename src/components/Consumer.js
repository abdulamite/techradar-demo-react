import React, { Component } from "react";
import "./component-styles/Consumer.css";

export class Consumer extends Component {
  render() {
    return (
      <li>
        <p>{this.props.details.name}</p>
        <p>{this.props.details.wait}</p>
      </li>
    );
  }
}

export default Consumer;
