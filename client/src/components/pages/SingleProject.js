//single project 
import React, { Component} from "react";
import StoryCard from "../modules/StoryCard";
import { get } from "../../utilities";
import { Link } from "@reach/router";
import Journal from "../modules/Journal.js";
import NewInputStory from "../modules/NewInputStory.js";
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
            stories: [{textcontent:"Hello this a test story",projectId:"123",links:[1,2],_id:"1"},],
        }
        
    }
    //i want the api to filter by project id and return stories state
    loadStoryCards(project){
        get("/api/stories",{project_id: this.props.projectId}).then((storyObjs)=>{
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
            //this.loadStoryCards(this.prop.projectId);
    }

    addNewStory = (storyObj) =>{
        this.setState({
            stories: [storyObj].concat(this.state.stories)
        });
    }
    render(){
        let storiesList = null;
        const hasStories = this.state.stories.length !== 0;
        if(hasStories){
            console.log("no errors here")
            storiesList = this.state.stories.map((StoryObj)=>
            {
                <StoryCard
                    key ={`StoryCard_${StoryObj._id}`}
                    storyObj = {StoryObj}
                    userId={this.props.userId}
                />
                console.log("This is working");
            });
            console.log("Test: " + storiesList)
        } else{
            storiesList = <div>No Stories!</div>
        }
        console.log("hello")
        console.log(this.state.stories[0].textcontent);
        return(
            <>
            <div>
                {storiesList}
            </div>
           
            {/* <NewInputStory projectId = {this.props.projectId} onSubmit = {this.loadStoryCards}/> */}
            <div>
                <Journal userId ={this.props.userId} projectId={this.props.addNewStory}/>
            </div>
            </>
        );
    }
}

export default SingleProject;