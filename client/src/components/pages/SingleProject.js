//single project 
import React, { Component} from "react";
import StoryCard from "../modules/StoryCard";
import { get } from "../../utilities";
import { Link } from "@reach/router";
import Journal from "../modules/Journal.js";
import NewInputStory from "../modules/NewInputStory.js";
import "./SingleProject.css";

//this would be used to render what you see w
//when you open a project 
//
/**
 * Single project renders the content of a project file
 * 
 * Proptypes 
 * projectId : String, identifying what project it is
 * userId: String, identifying id of current user (undefined if not)
 * @param {string} projectId of the project 
 * @param {string} project_name
 * @param {string} collaborators
 * @param {string} userId
 * 
 */
class SingleProject extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            stories: [],
            edit: true

        }
        
    }
    
    //i want the api to filter by project id and return stories state
    loadStoryCards= () => {
        
        get("/api/storycards",{projectId: this.props.projectId}).then((storyObjs)=>{
            let reversedStory = storyObjs.reverse();
            reversedStory.map((storyObj)=>{
                this.setState({stories: this.state.stories.concat([storyObj]),
                });
            });
        });
    }
    //called when "SingleProject" mounts
    componentDidMount(){
            document.title = "Single Project";
            this.loadStoryCards();
    }
    //this will eventually add a new story
    addNewStory = (storyObj) =>{
        this.setState({
            stories: [storyObj].concat(this.state.stories)
        });
    }
    render(){
        let storiesList = null;
        const hasStories = this.state.stories.length !== 0;
        if(hasStories){
            storiesList = this.state.stories.map((StoryObj)=>
            (
                <StoryCard
                    key = {`StoryCard_${StoryObj._id}`}
                    storyObj = {StoryObj}
                    userId = {this.props.userId}
                    edit = {this.state.edit}
                />
            ));
        } else{
            storiesList = <div>No Stories!</div>
        }
        
        return(
            <>
            <div className="u-flex project-container"> 
                <section className="projectDocumentation-container">
                    {storiesList}
                    <NewInputStory projectId = {this.props.projectId} onSubmit = {this.addNewStory}/> 
                </section>
                
            <section >
                    <Journal userId ={this.props.userId} projectId={this.props.projectId}/>
                </section>
            </div>

            </>
        );
    }
}

export default SingleProject;