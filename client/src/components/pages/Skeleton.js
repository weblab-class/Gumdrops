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
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
      <div className="u-flexColumn">
        <section className="u-textCenter Skeleton-title">
          <h1>For all your project needs</h1>
        </section>
        <section className="u-textCenter Skeleton-mainPage-Description">
          <p>From brainstorming new ideas to designing your next project wiki, Gumdrops make it easy for you to document your project and collaborate with others.</p>
        </section>
      </div>
      </>
    );
  }
}

export default Skeleton;
