import React, { Component } from "react";
import "../../utilities.css";
import "../pages/SingleProject.css";

/**
 * DivCreator is a temporary component created to aid Juan in developing the TypeWriter Effect
 *
 * Proptypes
 * 
 */

class DivCreator extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {

    }

    render() {
      return (
          <section className="projectPresentation-container">
            <h3>This is going to be space reserved for the typewriting effect. I will  make it triggered by button click later</h3>
          </section>

      );
    }
  }

export default DivCreator;
