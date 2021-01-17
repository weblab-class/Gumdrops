//Makes new stories 
import React, {Component, useCallback} from "react";
import {render} from "react-dom";
import {post} from "../../utilities.js";
import "./NewPostInput.css";
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
    
    //called when the user hits "add"  for a story
    handleAdd = () => {
        console.log("hey i added a new story")
        const body = {textcontent: "", projectId: this.props.projectId , links: []};
        post("/api/storycards", body).then((story)=>
        {
            this.props.onSubmit && this.props.onSubmit(body);
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