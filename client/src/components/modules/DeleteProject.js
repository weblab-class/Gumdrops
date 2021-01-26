import React, {Component} from "react";
import {post} from "../../utilities";
import "../../utilities.css";
import "./NewPostInput.css";
import "../pages/SingleProject.css";

/**
 * Delete Project will allow for the deletion of a project
 * 
 * Proptypes 
 * @param {String} projectId : id of the project to be deleted
 */

 class DeleteProject extends Component{
     constructor(props){
         super(props);
     }
    handleDelete = (event)=>{
        let body = {projectId:this.props.projectId};
        post("/api/delproject",body).then((result)=>{
            console.log("Project has been deleted");
            window.location.replace("/projects");
        });
    }
    
    render(){
        return(
            <button 
                type = "submit"
                className=  "NewPostInput-button project-buttonDelete u-point"
                value = "Submit"
                onClick = {this.handleDelete}
            >
                Delete Project
            </button>
        );
    }
 }
 export default DeleteProject;