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
          roles: "", //String
          tags: "", //String
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

    rolesOnChange = (event) => {
      this.setState({
        roles: event.target.value,
      });
    }

    thumbnailOnChange = (image) => {
      this.setState({
        thumbnail: image,
      });
      console.log("I received an image at main of "+image.substr(0,100))
    }

    projectTagsOnChange = (event) => {
      this.setState({
        tags: event.target.value,
      });
    }

    handleSubmit = () => {
      if(this.state.projectName !== "") {
        let collabArray = ["@"+this.props.userId,]; //handling split of collaborators
        if(this.state.collaborators!=="") {
          collabArray = collabArray.concat(this.state.collaborators.split(" "));
        }
        let rolesArray = []; //handling split of roles
        if(this.state.roles!=="") {
          rolesArray = this.state.roles.split(" ");
          console.log(collabArray);
          collabArray = collabArray.map((value, i)=>{
            return({
              userName: value.slice(1),
              role: rolesArray[i].slice(1),
            });
          })
          console.log(collabArray);
        } else {
          collabArray = collabArray.map((value)=>{
            return({
            userName: value.slice(1),
            role: "team_member",
            }); //hard-coded to member for now
          });
        }

        let tagsArray; //handling split of tags
        if(this.state.tags==="") {
          tagsArray = ["#no-tag"];
        } else {
          tagsArray = this.state.tags.split(" ");
        }
        console.log(tagsArray);

        let projectObj = { //Create project object
          name : this.state.projectName,
          collaborators: collabArray,
          tags: tagsArray,
        };

        //async function to post to new project
        let postProject = async () => {
          let projectid = await post("/api/project",projectObj);
          console.log("New project with id "+ projectid);
          let promise1 = post("/api/user_add_project",{ //adds projectId to user's projectIds array
            userId: this.props.userId,
            projectId: projectid,
          });
          let promise2 = new Promise((resolve,reject) => {
            if(this.state.thumbnail){
              console.log("Tries to add thumbnail to database");
              let thumbnailObj = {
                projectId : projectid,
                image: this.state.thumbnail,
              }
              //proceeds to upload thumbnail
              post("/api/thumbnail",thumbnailObj).then(resolve("done"));
            } else {
              resolve("done");
            }
          });
          Promise.all([promise1, promise2]).then((values) => {
            this.setState({ //resets the fields
              projectName: "", 
              collaborators: "", 
              roles: "", 
              tags: "",
              thumbnail: null, 
            });
            window.location.replace("/project/"+projectid); //redirect to new project page
          });
        }
        postProject();
      }
    }

    render() {
      return (
          <div className="u-flexColumn CreateProject-container">
            <section className="CreateProject-inputContainer">
              <h3 className="u-textCenter">Project Name (Required):</h3>
              <NewProjectInput onChange={event => this.projectNameOnChange(event)} value={this.state.projectName}/>
            </section>
            <section className="CreateProject-inputContainer">
              <h4 className="u-textCenter">Who are your collaborators? (e.g., "@DVILL_17 @Juan")</h4>
              <NewProjectInput onChange={event => this.collabOnChange(event)} value={this.state.collaborators}/>
            </section>
            <section className="CreateProject-inputContainer">
              <h4 className="u-textCenter">What are your team's roles?</h4>
              <h4 className="u-textCenter">Choose from leo-der, researcher, content-creator, developer, desiigner</h4>
              <h4 className="u-textCenter">(start with yourself and continue in the order that you used in the last question)</h4>
              <h4 className="u-textCenter">(e.g., "@leo-der @researcher @developer")</h4>
              <NewProjectInput onChange={event => this.rolesOnChange(event)} value={this.state.roles}/>
            </section>
            <section className="CreateProject-inputContainer">
              <h4 className="u-textCenter">Relevant Project Tags: (e.g., "#fun-project #magnetism")</h4> 
              <NewProjectInput onChange={event => this.projectTagsOnChange(event)} value={this.state.tags}/>
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
