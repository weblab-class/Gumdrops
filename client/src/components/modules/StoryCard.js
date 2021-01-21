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
import LinkBlock from "./LinkBlock.js";
import SingleText from "./SingleText.js";

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
            storytext: this.props.storyObj.textContent,
            image: undefined,
            editing: false
        };
        
    }
    //runs when storycard mounts
    componentDidMount(){
        
        
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
    //extra steps needed for handling link nad posting 
    editLink = (addLink)=>{
        let newLinkList = this.props.storyObj.links.concat([addLink]);
        let body = {_id: this.props.storyObj._id, changes:{links:newLinkList}};
        console.log("we receive on story card")
        console.log(body);
        post("/api/editstorycard",body).then((story)=>{
            console.log(story);

            this.props.onAddLink && this.props.onAddLink(body);
        })
    }
    //extra steps to delete link
    deleteLink=(linkObj)=>{
        let body = {_id: this.props.storyObj._id, changes:{links:linkObj}};
        console.log("we receive on story card")
        console.log(body);
        post("/api/editstorycard",body).then((story)=>{
            console.log(story);

            this.props.onAddLink && this.props.onAddLink(body);
        })
    }
    //this would eventually allow to edit stories
    editStory =(changesObj)=>{
        
        let body = {_id: this.props.storyObj._id, changes:changesObj}
        console.log("received in Story card");
        console.log(body);
        post("/api/editstorycard",body).then((story) =>{
            console.log(story);
            
            this.setState({
                storytext:changesObj.textContent,
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
        
        let button = <></>;
        let text = (<SingleText
             defaultText = "EnterStory"
            prevStory = {this.state.storytext}
            isEditing = {this.state.editing}
         onSumbit = {this.editStory}/>)
        //  <section className="StoryCard-textBlockContainer">
        //         </section>
        if(!this.props.edit){ //not allowed to edit 
            
        } else{
            if(!this.state.editing){ //not editing right now
                button = (
                    <>
                    <button 
                        type = "submit"
                        className = "NewPostInput-button StoryCard-editButton u-pointer"
                        value = "Submit"
                        onClick={this.clickedEditing}
                        >Edit
                    </button>
                    </>
                )
            }
            else{ //is currently editing
                button = (
                <>
                    <DeleteStoryCard onDelete={this.props.delete} storyObj = {this.props.storyObj}/>
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
        let fullBox = (
            <>
                <section className="StoryCard-imageBlockContainer" />
                {text}
                {button}
                <section className="StoryCard-linkBlockContainer">
                    <LinkBlock  onEdit={this.editLink}
                    editing ={this.state.editing} 
                    linkArr = {this.props.storyObj.links}
                    onDel = {this.deleteLink}/>
                </section>
            </>
        )
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
                        {fullBox}
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
                        {fullBox}
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
                    {fullBox}
                </div>
            );
        }
        return(
            <div className = "u-flex StoryCard-container">
                {fullBox}
            </div>
        );
    }
}
export default StoryCard;