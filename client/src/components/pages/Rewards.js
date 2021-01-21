import React, { Component } from "react";

import "../../utilities.css";

class Rewards extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
      <div className="u-flexColumn u-textCenter">
        <h1>Rewards</h1>
      </div>
      </>
    );
  }
}

export default Rewards;
