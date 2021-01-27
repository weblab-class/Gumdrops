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
          <p className="Skeleton-mainPage-text">From animated story cards to themed-rewards, Gumdrops offers a fun, collaborative space for students and lifelong-learners to document their projects and reflect on the journey they took along the way.</p>
        </section>
        <div className="u-flex u-flex-justifyCenter">
          <section className="u-textCenter Skeleton-mainPage-2ndDescription">
            <h1 className="Skeleton-2ndtitle">Who is Gumdrops made for?</h1>
            <p className="Skeleton-mainPage-2ndtext">Gumdrops is open to anyone who is looking for a new way of keeping track of project links and documents in a way that emphasizes human-readability and highlights their stories.</p>
          </section>
          <section className="u-textCenter Skeleton-mainPage-2ndDescription">
            <h1 className="Skeleton-2ndtitle">How is Gumdrops used?</h1>
            <p className="Skeleton-mainPage-3rdtext">Gumdrops is itended to sit as an additional layer above cloud storage websites like Google Drive and Github. It offers users a method to organize their links and pictures in the form of "storycards" that makes it easy for them come back to a project and share with others about their progress.</p>
          </section>
        </div>

      </div>
    );
  }
}

export default Skeleton;
