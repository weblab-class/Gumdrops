//project documentation
//this is where you work on your projects 
import React, {Component} from "react";
import { render } from "react-dom";
import "./NewPostInput.css";
import { post } from "../../utilities";
import { get} from "../../utilities";
import "./StoryCard.css";
import DeleteStoryCard from "./DeleteStoryCard.js";
import EditStoryCard from "./EditStoryCard.js";
import LinkBlock from "./LinkBlock";
/**
 * Proptypes 
 * @param {Object } storyObj : sends story object
 * @param {string}  userId 
 */
class StoryCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            storytext: "",
            editing: false
        };
        
    }
    //runs when storycard mounts
    componentDidMount(){
        this.setState({storytext : this.props.storyObj.textContent},)
    }

    //changes state of editing 
    clickedEditing=(event)=>{
        event.preventDefault();
        this.setState({editing: !this.state.editing});
    }
    
    //this would eventually allow to edit stories
    editStory =(changesObj)=>{
        let body = {_id: this.props.storyObj._id, changes:changesObj}
        console.log(body);
        post("/api/editstorycard",body).then((story) =>{
            console.log(story);
            
            this.setState({
                storytext:changesObj.textContent,
                editing: !this.state.editing,
            });
            this.props.onEdit && this.props.onEdit(body);   
        });
    }
    
    render(){ 
        let output = null;
        if(!this.props.edit){
            output = (
                <>
                <p>{this.state.storytext}</p>
                
                </>
                )
        } else{
            
            if(!this.state.editing){
                output = (
                    <>
                    <p className= "StoryCard-storytext">{this.state.storytext}</p>
                    <button 
                    type = "submit"
                    className = "NewPostInput-button u-pointer"
                    value = "Submit"
                    onClick={this.clickedEditing}

                    >Edit
                    </button>
                    
                </>
                )
            }
            else{
                output = (
                <>

                    <DeleteStoryCard onDelete={this.props.delete} storyObj = {this.props.storyObj}/>
                    <EditStoryCard onEdit = {this.editStory} storyObj = {this.props.storyObj}/>
                    <button 
                    type = "submit"
                    className = "NewPostInput-button u-pointer"
                    value = "Submit"
                    onClick={this.clickedEditing}
                    >Cancel
                    </button>
                    
                </>
                )   
            }
        }
        return(
            <div className = "u-flex StoryCard-container">
                {output}
                <LinkBlock linkArr = {this.props.storyObj.links}/>
            </div>
        )
    }
}
export default StoryCard;