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
 * @param {Object} storyObj : sends story object
 * @param {String} userId 
 * @param {Boolean} edit determines if current user can edit
 */
class StoryCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            storytext: "",
            image: undefined,
            editing: false
        };
        
    }
    //runs when storycard mounts
    componentDidMount(){
        this.setState({storytext : this.props.storyObj.textContent},)
        get("/api/story-image", {_id:this.props.storyObj._id}).then((pic)=>{
            if(pic !== null) {
                this.setState({
                    image: pic.image,
                });
            }
        });
        // console.log("State: "+this.state.image)
    }

    //changes state of editing 
    clickedEditing=(event)=>{
        event.preventDefault();
        this.setState((prevstate) => ({
            editing: !prevstate.editing,
        }));
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

    editImage =(changesObj)=>{
        let body = {_id: this.props.storyObj._id, changes:changesObj}
        console.log(body);
        post("/api/editstorycard",body).then((story) =>{
            
            this.setState({
                image:changesObj.imageMedia,
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
                    <EditStoryCard 
                        onEdit = {this.editStory} 
                        storyObj = {this.props.storyObj}
                        editImage={false}
                    />
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
        if(this.props.edit){
            if(this.state.image) {
                return(
                    <div className = "u-flex StoryCard-container">
                        <section className="StoryCard-imageBlockContainer">
                            <img 
                                style={{height: "75", width: "75%", objectFit: "contain"}}
                                src={this.state.image}
                                className="StoryCard-center"
                            />
                            <EditStoryCard 
                                onEdit = {this.editImage} 
                                storyObj = {this.props.storyObj} 
                                editImage={true}
                            />
                        </section>
                        {output}
                        <section className="StoryCard-linkBlockContainer">
                            <LinkBlock linkArr = {this.props.storyObj.links}/>
                        </section>
                    </div>
                );
            } else{
                return(
                    <div className = "u-flex StoryCard-container">
                        <section className="StoryCard-imageBlockContainer">
                            <h3 className="u-textCenter">Add an Image</h3>
                            <EditStoryCard 
                                onEdit = {this.editImage} 
                                storyObj = {this.props.storyObj} 
                                editImage={true}
                            />
                        </section>
                        {output}
                        <section className="StoryCard-linkBlockContainer">
                            <LinkBlock linkArr = {this.props.storyObj.links}/>
                        </section>
                    </div>
                );
            }
        }
        if(this.state.image){
            return(
                <div className = "u-flex StoryCard-container">
                    <section className="StoryCard-imageBlockContainer">
                        <img 
                            style={{height: "75%", width: "75%", objectFit: "contain"}}
                            src={this.state.image}
                            className="StoryCard-center"
                        />
                    </section>
                    {output}
                    <section className="StoryCard-linkBlockContainer">
                        <LinkBlock linkArr = {this.props.storyObj.links}/>
                    </section>
                </div>
            );
        }
        return(
            <div className = "u-flex StoryCard-container">
                <section className="StoryCard-imageBlockContainer" />
                {output}
                <section className="StoryCard-linkBlockContainer">
                    <LinkBlock linkArr = {this.props.storyObj.links}/>
                </section>
            </div>
        );
    }
}
export default StoryCard;