//Makes new stories 
import React, {Component, useCallback} from "react";
import {render} from "react-dom";
import {post} from "../../utilities.js";
import "./NewPostInput.css";

/**
 * New Post is a parent component for all input components
 * 
 * Proptypes
 *  (function)
 * triggered when this post is submitted,takes {storyId, value}
 * as parameters
 */
class NewInputStory extends Component {
    constructor(props){
        super(props);
        
    }
    // projectId: String,
    // textTitle: String,
    // textContent: String,
    // links: [String],
    // videoMedia: String,
    // imageMedia: Buffer,
    //will add new story to server and inform single project
    handleAdd = (event) => {
        event.preventDefault();
        
        const body = {projectId: this.props.projectId , textTitle: "",textContent: "",links: [],videoMedia:"",imageMedia:null,imageHeader:""};
        post("/api/storycards", body).then((story)=>
        {
            console.log("hey i added a new story");
            this.props.onSubmit && this.props.onSubmit(story);
        });
    }
    render(){
        return(
        <button 
        type = "submit"
        className=  "New PostInput-button u-point"
        value = "Submit"
        onClick = {this.handleAdd}
        >
            Add New Story!!
        </button>
        )
    }
}

export default NewInputStory;