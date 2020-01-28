import React, { Component } from "react";
import "./component-styles/Header.css";

export class Header extends Component {
  render() {
    return (
      <nav>
        <div className="location">
          <h1>{this.props.locationDescription}</h1>
        </div>
      </nav>
    );
  }
}

export default Header;
