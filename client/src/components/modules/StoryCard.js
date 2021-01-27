//project documentation
//this is where you work on your projects 
import React, {Component} from "react";
import { render } from "react-dom";
import { post } from "../../utilities";
import { get} from "../../utilities";
import DeleteStoryCard from "./DeleteStoryCard.js";
import EditStoryCard from "./EditStoryCard.js";
import LinkBlock from "./LinkBlock.js";
import SingleText from "./SingleText.js";
import "./NewPostInput.css";
import "./StoryCard.css";

/**
 * Proptypes 
 * @param {Object} storyObj : sends story object
 * @param {String} userId 
 * @param {Boolean} edit determines if current user can edit
 * @param {Object} userRoles (where key is userName and value is an Array of [userName,userId,roleStyle])
 */
class StoryCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            storytext: this.props.storyObj.textContent,
            editing: false
        };
    }

    //changes state of editing 
    clickedEditing=(event)=>{
        event.preventDefault();
        this.setState((prevstate) => ({
            editing: !prevstate.editing,
        }));
    }
    //extra steps needed for handling link nad posting 
    editLink = (addLink)=>{
        let newLinkList = this.props.storyObj.links.concat([addLink]);
        let body = {_id: this.props.storyObj._id, changes:{links:newLinkList}};
        console.log("we receive on story card")
        // console.log(body);
        post("/api/editstorycard",body).then((story)=>{
            // console.log(story);
            this.props.onAddLink && this.props.onAddLink(body);
        })
    }
    //extra steps to delete link
    deleteLink=(linkObj)=>{
        let body = {_id: this.props.storyObj._id, changes:{links:linkObj}};
        console.log("we receive on story card")
        // console.log(body);
        post("/api/editstorycard",body).then((story)=>{
            // console.log(story);
            this.props.onAddLink && this.props.onAddLink(body);
        })
    }
    //this would eventually allow to edit stories
    editStory =(changesObj)=>{
        let body = {_id: this.props.storyObj._id, changes:changesObj}
        post("/api/editstorycard",body).then((story) =>{
            this.setState({
                storytext:changesObj.textContent,
            });
            this.props.onEdit && this.props.onEdit(body);   
        });
    }
    //edits the image associated with a storycard
    editImage =(changesObj)=>{
        let body = {_id: this.props.storyObj._id, changes:changesObj}
        // console.log(body);
        post("/api/editstorycard",body).then((story) =>{
            this.setState({
                image:changesObj.imageMedia,
            });
            this.props.onEdit && this.props.onEdit(body);   
        });
    }

    render(){ 
        let button = <></>;
        let picture = <></>;
        let text = (
            <SingleText
                defaultText = "EnterStory"
                prevStory = {this.state.storytext}
                isEditing = {this.state.editing}
                onSubmit = {(value)=>this.editStory(value)}
                userRoles = {this.props.userRoles}
            />
        );
        if(!this.props.edit){ //not allowed to edit 
            if(this.props.storyObj.imageMedia){
                picture = (
                    <section className="StoryCard-imageBlockContainer">
                        <img 
                            style={{height: "75", width: "75%", objectFit: "contain"}}
                            src={this.props.storyObj.imageMedia}
                            className="StoryCard-center"
                        />
                    </section>
                );
            } else{
                picture = (
                    <section className="StoryCard-imageBlockContainer">
                        <div className="u-textCenter StoryCard-centerImage">No image</div>
                    </section>
                );
            }
        } else{
            if(!this.state.editing){ //not editing right now
                if(this.props.storyObj.imageMedia){
                    picture = (
                        <section className="StoryCard-imageBlockContainer">
                            <img 
                                style={{height: "75", width: "75%", objectFit: "contain"}}
                                src={this.props.storyObj.imageMedia}
                                className="StoryCard-center"
                            />
                        </section>
                    );
                } else{
                    picture = (
                        <section className="StoryCard-imageBlockContainer">
                            <div className="u-textCenter StoryCard-centerImage">No image</div>
                        </section>
                    );
                }
                button = (
                    <button 
                        type = "submit"
                        className = "NewPostInput-button StoryCard-editButton2 u-pointer"
                        value = "Submit"
                        onClick={this.clickedEditing}
                    >Edit
                    </button>
                );
            }
            else{ //is currently editing
                if(this.props.storyObj.imageMedia){
                    picture = (
                        <>
                            <section className="StoryCard-imageBlockContainer">
                                <img 
                                    style={{height: "75", width: "75%", objectFit: "contain"}}
                                    src={this.props.storyObj.imageMedia}
                                    className="StoryCard-centerEditing"
                                />
                                <EditStoryCard 
                                    onEdit = {this.editImage} 
                                    storyObj = {this.props.storyObj} 
                                    editImage={true}
                                />
                            </section>
                        </>
                    );
                } else {
                    picture = (
                        <section className="StoryCard-imageBlockContainer">
                            <h3 className="u-textCenter">Add an Image</h3>
                            <EditStoryCard 
                                onEdit = {this.editImage} 
                                storyObj = {this.props.storyObj} 
                                editImage={true}
                            />
                        </section>
                    );
                }
                button = (
                    <div className="StoryCard-buttonsContiner">
                        <DeleteStoryCard onDelete={this.props.delete} storyObj={this.props.storyObj}/>
                        <button 
                            type = "submit"
                            className = "NewPostInput-button StoryCard-editButton u-pointer"
                            value = "Submit"
                            onClick = {this.clickedEditing}
                        >Cancel
                        </button>
                    </div>
                );   
            }
        }
        return(
            <div className = "u-flex StoryCard-container">
                {picture}
                <section className="StoryCard-textBlockContainer">
                    {text}
                    {button}
                </section>
                <section className="StoryCard-linkBlockContainer">
                    <LinkBlock  
                        onEdit= {this.editLink}
                        editing = {this.state.editing} 
                        linkArr = {this.props.storyObj.links}
                        onDel = {this.deleteLink}
                    />
                </section>
            </div>
        );
    }
}
export default StoryCard;