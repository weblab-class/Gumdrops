import React, { Component } from "react";
import NewProjectInput from "../modules/NewProjectInput";
import "../modules/NewProjectInput.css"; //uses styling for button
import "./CreateProject.css";
import NewThumbnailInput from "../modules/NewThumbnailInput.js";
import { get, post } from "../../utilities.js";
/**
 * CreateProject is a component page that displays options to create a new project
 *
 * Proptypes
 * @param {String} userId (passed from Projects.js)
 */

class CreateProject extends Component {
    constructor(props) {
      super(props);
      this.state = {
          projectName: "", //String
          collaborators: "", //String
          teamId: "", //String
          thumbnail: null, //File object
      };
    }

    //The following are callback functions that input fields use to 
    //store their value in the CreateProject's state.
    projectNameOnChange = (event) => {
      this.setState({
        projectName: event.target.value,
      });
    }

    collabOnChange = (event) => {
      this.setState({
        collaborators: event.target.value,
      });
    }

    teamIdOnChange = (event) => {
      this.setState({
        teamId: event.target.value,
      });
    }

    thumbnailOnChange = (image) => {
      this.setState({
        thumbnail: image,
      });
      console.log("I received an image at main of "+image.substr(0,100))
    }


    handleSubmit = () => {
      let collabArray;
      console.log("Collaborators is "+this.state.collaborators);
      if(this.state.collaborators==="") {
        console.log("I went into here");
        collabArray = ["@"+this.props.userId];
      } else {
        collabArray = this.state.collaborators.split(" ");
        collabArray.push(this.props.userId);
      }
      console.log(collabArray);
      collabArray = collabArray.map((value)=>{
        return({
        userId: value.slice(1),
        role: "@team_member",}); //hard-coded to member for now
      });
      console.log(collabArray);
      let projectObj = {
        name : this.state.projectName,
        collaborators: collabArray,
        teamId: this.state.teamId,
      };
      post("/api/project",projectObj).then(projectid=>{
        console.log(projectid);
        if(this.state.thumbnail!==null){
        let thumbnailObj = {
          projectId : projectid,
          image: this.state.thumbnail,
        }
        post("/api/thumbnail",thumbnailObj).then((res)=>{
          this.setState({ //resets the fields
            projectName: "", 
            collaborators: "", 
            teamId: "", 
            thumbnail: null, 
          });
        });
        } else {
          //nothing more to do
          this.setState({ //resets the fields
            projectName: "", 
            collaborators: "", 
            teamId: "", 
            thumbnail: null, 
          });
        }
      });

    }

    render() {
      return (
          <div className="u-flexColumn CreateProject-container">
            <section className="CreateProject-inputContainer">
              <h3 className="u-textCenter">Project Name:</h3>
              <NewProjectInput onChange={event => this.projectNameOnChange(event)} value={this.state.projectName}/>
            </section>
            <section className="CreateProject-inputContainer">
              <h4 className="u-textCenter">Who are your collaborators? (e.g., "@DVILL17 @Juan")</h4>
              <NewProjectInput onChange={event => this.collabOnChange(event)} value={this.state.collaborators}/>
            </section>
            <section className="CreateProject-inputContainer">
              <h4 className="u-textCenter">What is your team ID?</h4> 
              <NewProjectInput onChange={event => this.teamIdOnChange(event)} value={this.state.teamId}/>
            </section>
            <section className="CreateProject-inputContainer">
              <h4 className="u-textCenter">Please select an image for your thumbnail</h4> 
              <NewThumbnailInput onChange={event => this.thumbnailOnChange(event)} selectedFile={this.state.thumbnail}/>
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
