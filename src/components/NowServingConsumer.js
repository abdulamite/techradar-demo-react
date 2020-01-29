import React, { Component } from "react";

export class NowServingConsumer extends Component {
  render() {
    return <li>{this.props.spot.$.privateName}</li>;
  }
}

export default NowServingConsumer;
