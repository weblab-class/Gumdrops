//single project 
import React, { Component} from "react";
import StoryCard from "../modules/StoryCard";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";
import Journal from "../modules/Journal.js";
import NewInputStory from "../modules/NewInputStory.js";
import "./SingleProject.css";
import DeleteProject from "../modules/DeleteProject.js";

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
 * @param {string} userId
 * 
 */
class SingleProject extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            stories: [],
            edit: true

        }//in case i forget change back to false 

       
    }

    checkCanEdit=()=>{
        const body = {
            userId : this.props.userId,
            projectId : this.props.projectId
        };
        get("/api/isUserCollaborator",body).then((bool)=>{
            this.setState({
                edit: bool,
            });
        });
    }
    
    //i want the api to filter by project id and return stories state
    loadStoryCards= () => {
        get("/api/storycards",{projectId: this.props.projectId}).then((storyObjs)=>{
            let reversedStory = storyObjs;
            reversedStory.map((storyObj)=>{
                this.setState((prevstate) => ({
                    stories: prevstate.stories.concat([storyObj]),
                }));
            });
        });
    }
    //called when "SingleProject" mounts
    componentDidMount(){
        document.title = "Single Project";
        this.loadStoryCards();
        this.checkCanEdit();
    }
    //automatically adds a story when clicked
    addNewStory = (storyObj) =>{
        console.log("i added a new story");
        this.setState({
            stories: this.state.stories.concat([storyObj]),
        });
    }
    //automatically deletes story when clicked
    deleteNewStory = (storyObj)=>{

        let tempArray = [...this.state.stories];
        for(let i = 0; i< this.state.stories.length ; i++){
            if(this.state.stories[i]._id  == storyObj._id){
                tempArray.splice(i,1);
                break;
            }
        }
        this.setState({
            stories: tempArray,
        });
    }
    editStory = (storyObj) => {
        let tempArray = [...this.state.stories];
        for(let i=0; i<this.state.stories.length;i++){
            if(this.state.stories[i]._id == storyObj._id){
                tempArray[i].textContent = storyObj.changes.textContent;
                break;
            }
        }
        this.setState({
            stories:tempArray,
        })
    }
    render(){
        let storiesList = null;
        let stringId = null;
        const hasStories = this.state.stories.length !== 0;
        if(hasStories){
            storiesList = this.state.stories.map((storyObj)=>
            (
                <StoryCard
                    storyObj = {storyObj}
                    key = {storyObj._id}
                    userId = {this.props.userId}
                    edit = {this.state.edit}
                    delete = {this.deleteNewStory}
                    onEdit = {this.editStory}
                />
            ));
        } else{
            storiesList = <div>No Stories!</div>
        }
      //  console.log(this.state.stories[0]._id)
        //console.log(typeof this.state.stories[0]._id)
        return(
            <>
            <div className="u-flex project-container"> 
                <section className="projectDocumentation-container">
                    <h2 className="projectDocumentation-headerTitle">Create your own story.</h2>
                    <h4>Loading may take some time..</h4>
                    {storiesList}
                    <NewInputStory projectId = {this.props.projectId} onSubmit = {this.addNewStory}/> 
                    <DeleteProject projectId={this.props.projectId}/>
                </section>
                <section className="projectJournal-container">
                    <Journal userId ={this.props.userId} projectId={this.props.projectId} canSend={this.state.edit}/>
                </section>
            </div>

            </>
        );
    }
}

export default SingleProject;