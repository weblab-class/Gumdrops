import React, { Component } from "react";

/**
 * CreateProject is a component page that displays options to create a new project
 *
 * Proptypes
 * 
 */

class CreateProject extends Component {
    constructor(props) {
      super(props);
      this.state = {
          projectName: undefined,
          collaborators: [],
          teamId: undefined,
      }
    }

    componentDidMount() {
    }

    render() {
      return (
          <div>
              <p>Yo what up fam</p>
          </div>
      );
    }
  }

export default CreateProject;
