import React, {Component } from "react";
import { render } from "react-dom"
import "./NewPostInput.css";
import {post} from "../../utilities";
 
/**
 * Edit Story Card allows editing of a specific story card
 * 
 * Proptypes 
 * @param {Object} storyObj : story card object
 * @param {function} onEdit : function called edit is saved 
 */
class EditStoryCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            content:"",
        };
    }
    //handles typing 
    handleChange = (event)=>{
        this.setState({
            content: event.target.value
        });
    }
    //handles saving changes
    handleSave = (event)=>{
        event.preventDefault();
        const changes = {textContent:this.state.content};
        this.props.onEdit && this.props.onEdit(changes);
    }
    //initializes stats
    initState = (storyObj)=>{
        this.setState({
            content:this.props.storyObj.textContent,
        });
    }
    // this is run when EditStoryCard mount
    componentDidMount(){
        this.initState(this.props.storyObj);
    }
    
    render(){
        return(
            <div className ="u-flex">
                <input 
                type = "text"
                placeholder="enter story"
                value = {this.state.content}
                onChange = {this.handleChange}
                className = "NewPostInput-story"
                />
                <button 
                type = "submit"
                className = "NewPostInput-button u-pointer "
                value = "Submit"
                onClick={this.handleSave}
                >Save
                </button>
            </div> 
        )
    }
}
export default EditStoryCard