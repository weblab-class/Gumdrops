import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    // remember -- api calls go here!
    return (
      <div className="Skeleton-mainPage-container u-flexColumn">
        <section className="u-textCenter Skeleton-mainPage-Description">
          <h1 className="Skeleton-title">Tell a story with your next creative project.</h1>
          <p className="Skeleton-mainPage-text">From animated story cards to fun rewards, Gumdrops offers a collaborative space for students and lifelong-learners to document their projects and reflect on the journey that they took to get there.</p>
        </section>
      </div>
    );
  }
}

export default Skeleton;
