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
          <h1 className="Skeleton-title">For all your project needs</h1>
          <p className="Skeleton-mainPage-text">From brainstorming new ideas to designing your next project wiki, Gumdrops make it easy for you to document your project and collaborate with others.</p>
        </section>
      </div>
    );
  }
}

export default Skeleton;
