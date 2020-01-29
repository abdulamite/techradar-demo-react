import React, { Component } from "react";

export class NowServingConsumer extends Component {
  render() {
    return (
      <li>
        {this.props.spot.$.lastName
          ? `${this.props.spot.$.lastName[0]}, ${this.props.spot.$.firstName} `
          : this.props.spot.$.privateName}
      </li>
    );
  }
}

export default NowServingConsumer;
