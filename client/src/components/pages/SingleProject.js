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
 * @param {string} project_id of the project 
 * @param {string} project_name
 * @param {string} collaborators
 * @param {string} userId
 * 
 */
class SingleProject extends Component{
    constructor(props){
        super(props);
        this.state = {

            storiesIds: [],
        }
    }
    //i want the api to filter by project id and return storyIds list
    loadStoryCards(project){
        get("/api/project",{project_id: project._id}).then((storyObjs)=>{
            let reversedStory = storyObjs.storyIds.reverse();
            reversedStory.map((storyObj)=>{
                this.setState({storiesIds: this.state.storiesIds.concat([storyObj]),
                });
            });
        });
    }
    //called when "SingleProject" mounts
    componentDidMount(){
            document.title = "Single Project";
            //this.loadStoryCards(project._id);
    }

    
    render(){
        let storiesList = null;
        const hasStories = this.state.storiesIds.length !== 0;
        if(hasStories){
            storiesList = this.state.storiesIds.map((Ids)=>
            {
                <StoryCard
                    key ={`StoryCard_${Ids}`}
                    _id = {Ids}
                    userId={this.props.userId}
                />
            });
        } else{
            storiesList = <div>No Stories!</div>
        }

        return(
            <>
            
            {storiesList}
           
            {/* <NewInputStory onSubmit = {this.loadStoryCards(project._id)}/> */}
            <div>
                <Journal userId ={this.props.userId} projectId={this.props.projectId}/>
            </div>
            </>
        );
    }
}

export default SingleProject;