import React, { Component } from "react";
import "./component-styles/NowServing.css";

export class NowServing extends Component {
  componentDidUpdate = () => {
    // this.props.summoned.forEach(consumer => {
    //   console.log(consumer.ticketClassifier);
    // });
  };

  render() {
    return (
      <div className="summoned">
        <h2>Now Serving Customers</h2>
        <div className="summoned-consumers-list">
          {this.props.summoned.map((s, index) => (
            <p key={this.props.summoned[index].merchantConsumerInfoId}>
              {this.props.summoned[index].lastName
                ? `${this.props.summoned[index].firstName}, ${this.props.summoned[index].lastName[0]}`
                : this.props.summoned[index].privateName}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default NowServing;
