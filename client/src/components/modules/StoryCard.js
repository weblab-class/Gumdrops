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
 * @param {String}  userId 
 * @param {Boolean} edit determines if current user can edit
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
        if(!this.props.edit){ //not allowed to edit 
            output = (
                <section className="StoryCard-textBlockContainer">
                    <p>{this.state.storytext}</p>
                </section>
                )
        } else{

            if(!this.state.editing){ //not editing right now
                output = (
                <section className="StoryCard-textBlockContainer">
                    <p className= "StoryCard-storytext">{this.state.storytext}</p>
                    <button 
                        type = "submit"
                        className = "NewPostInput-button StoryCard-editButton u-pointer"
                        value = "Submit"
                        onClick={this.clickedEditing}
                        >Edit
                    </button>
                    
                </section>
                )
            }
            else{ //is currently editing
                output = (
                <section className="StoryCard-textBlockContainer">
                    <DeleteStoryCard onDelete={this.props.delete} storyObj = {this.props.storyObj}/>
                    <EditStoryCard onEdit = {this.editStory} storyObj = {this.props.storyObj}/>
                    <button 
                        type = "submit"
                        className = "NewPostInput-button u-pointer"
                        value = "Submit"
                        onClick={this.clickedEditing}
                        >Cancel
                    </button>
                </section>
                )   
            }
        }
        return(
            <div className = "u-flex StoryCard-container">
                <section className="StoryCard-imageBlockContainer">
                    <h3 className="u-textCenter">Insert Card Image here:</h3>
                    {/*placeholder for images*/}
                </section>
                {output}
                <section className="StoryCard-linkBlockContainer">
                    <LinkBlock linkArr = {this.props.storyObj.links}/>
                </section>
               
            </div>
        )
    }
}
export default StoryCard;