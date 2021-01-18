import React, { Component } from "react";
import NewProjectInput from "../modules/NewProjectInput";
import "../modules/NewProjectInput.css"; //uses styling for button
import "./CreateProject.css";
import NewImageInput from "../modules/NewImageInput.js";
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
          <div className="u-flexColumn CreateProject-container">
            <section className="CreateProject-inputContainer">
              <h3 className="u-textCenter">Project Name:</h3>
              <NewProjectInput />
            </section>
            <section className="CreateProject-inputContainer">
              <h4 className="u-textCenter">Who are your collaborators?</h4>
              <NewProjectInput />
            </section>
            <section className="CreateProject-inputContainer">
              <h4 className="u-textCenter">What is your team ID?</h4> 
              <NewProjectInput />
            </section>
            <section className="CreateProject-inputContainer">
              <h4 className="u-textCenter">Please select an image for your thumbnail</h4> 
              <NewImageInput />
            </section>
            <button
              type="submit"
              className="CreateProject-button u-pointer"
              value="Submit"
              onClick={this.handleSubmit}>Submit</button>
          </div>
      );
    }
  }

export default CreateProject;
