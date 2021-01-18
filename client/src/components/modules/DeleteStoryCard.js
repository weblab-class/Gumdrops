import React, {Component} from "react";
import "./NewPostInput.css";
import {post} from "../../utilities";

/**
 * Delete Story Card will allow for the deletion of story
 * 
 * Proptypes 
 * @param {object} storyObj : a story card object 
 * @param {function} onDelete: automatically deletes
 */

 class DeleteStoryCard extends Component{
     constructor(props){
         super(props);
     }

    handleDelete= (event)=>{
        event.preventDefault();
        const body = this.props.storyObj
        post("/api/delstorycard", body).then((storyObj)=>{
            console.log("deleted");   
        });
        this.props.onDelete && this.props.onDelete(body);
            

    }
    
    render(){
        return(
        <button 
        type = "submit"
        className=  "New PostInput-button u-point"
        value = "Submit"
        onClick = {this.handleDelete}
        >
            DeleteMe
        </button>
        )
    }
 }
 export default DeleteStoryCard;