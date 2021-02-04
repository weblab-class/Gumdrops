//single project 
import React, { Component} from "react";
import StoryCard from "../modules/StoryCard";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";
import Journal from "../modules/Journal.js";
import NewInputStory from "../modules/NewInputStory.js";
import DeleteProject from "../modules/DeleteProject.js";
import SampleStoryCard from "../modules/SampleStoryCard.js";
import "./SingleProject.css";
import "../../utilities.css";
import "../modules/NewPostInput.css";
import SingleDisplay from "../modules/SingleDisplay";
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
    _isMounted = false;
    constructor(props){
        super(props);
        this.viewCounted = false;
        this.state = {
            stories: undefined,
            userRoles: undefined,
            edit: undefined,
            isStoryTelling: false,
            projectObj: undefined, 
        }
    }

    retrieveProjectInfo = () => {
        get("/api/project",{projectId:this.props.projectId}).then((projectObj)=>{
            //pull current info about project
            this.setState({
                projectObj: projectObj,
            });
        });
    }

    retrieveUserRoleInfo = () => {
        get("/api/user-roles",{projectId:this.props.projectId}).then(result=>{
            if(this._isMounted){
                this.setState({
                    userRoles: result,
                });
            }
        });
    }
    checkCanEdit=()=>{
        const body = {
            userId : this.props.userId,
            projectId : this.props.projectId
        };
        if(!this.state.edit){
            get("/api/isUserCollaborator",body).then((bool)=>{
                if(this._isMounted && (this.state.edit!==bool)){
                    this.setState({
                        edit: bool,
                    });
                };
                this.addViews(bool);
            });
        }
    }
    //this will update the view count 
    addViews = (bool)=>{
        if(!bool){
            
            if(!this.viewCounted){
                get("/api/users-ids",{projectId: this.props.projectId}).then((idArr)=>{
                    let tempArr = idArr;
                    for( let i = 0; i, i<tempArr.length; i++){
                        let body = {userId: tempArr[i], changes:{views:1}}
                        post("/api/rewardinc",body).then((newData)=>{
                        
                        });
                    }
                })
                console.log("View counted");
                let body2= {projectId:this.props.projectId,changes:{views:1}};
                post("/api/projectinc",body2).then((sent)=>{
                    console.log("success");
                });
                this.viewCounted = true;
            }


        }
    }

    //i want the api to filter by project id and return stories state
    loadStoryCards= () => {
        let tempArr = [];
        get("/api/storycards",{projectId: this.props.projectId}).then((storyObjs)=>{
            let reversedStory = storyObjs;
            reversedStory.map((storyObj)=>{
                if(this._isMounted){
                    tempArr = tempArr.concat([storyObj]);
                };
            });
            this.setState({
                stories: tempArr,
            });
        });
        
    }
    //called when "SingleProject" mounts
    componentDidMount(){
        this._isMounted = true;
        document.title = "Single Project";
        this.retrieveProjectInfo();
        this.loadStoryCards();
        this.checkCanEdit();
        this.retrieveUserRoleInfo();
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    componentDidUpdate(){
        this.checkCanEdit();
    }
    addStorycard= (quant)=>{
        let body = {userId: this.props.userId, changes:{storycard:quant}}
        post("/api/rewardinc",body).then((newData)=>{
            console.log("succesful")
        });
        
    }
    //automatically adds a story when clicked
    addNewStory = (storyObj) =>{
        console.log("i added a new story");
        if(this._isMounted){
            this.setState({
                stories: this.state.stories.concat([storyObj]),
            });
        };
        this.addStorycard(1);
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
        if(this._isMounted){
            this.setState({
                stories: tempArray,
            });
        };
        this.addStorycard(-1);
    }
    editLinks = (linkObj)=>{
        let tempArray = [...this.state.stories];
        for(let i=0; i<this.state.stories.length;i++){
            if(this.state.stories[i]._id == linkObj._id){
                tempArray[i].links = linkObj.changes.links;
                break;
            }
        }
        console.log("made changes in story card")
        this.setState({
            stories:tempArray,
        })
        console.log(tempArray)
    }
    //imageMedia: Buffer,
    //imageHeader: String,
    editImage = (storyObj)=>{
        let tempArray = [...this.state.stories];
        console.log("edit image was updated in story card")
        for(let i=0; i<this.state.stories.length;i++){
            if(this.state.stories[i]._id == storyObj._id){
                tempArray[i].imageMedia = storyObj.changes.imageMedia;
                break;
            }
        }
        if(this._isMounted){
            this.setState({
                stories:tempArray,
            });
        };
    }
    editStory = (storyObj) => {
        let tempArray = [...this.state.stories];
        for(let i=0; i<this.state.stories.length;i++){
            if(this.state.stories[i]._id == storyObj._id){
                tempArray[i].textContent = storyObj.changes.textContent;
                break;
            }
        }
        if(this._isMounted){
            this.setState({
                stories:tempArray,
            });
        };
    }
    handlePresent = () => {
        if(this.state.isStoryTelling) {
            this.setState({
                isStoryTelling : false,
            });
        } else  {
            this.setState({
                isStoryTelling : true,
            })
        }
    }

    render(){
        let storiesList = <div>Loading...</div>;
        let stringId = null;
        let addStoryButton= "";
        let deleteProjectButton = "";
        const hasStories = this.state.stories;
        if(hasStories && this.state.edit){
            addStoryButton = <NewInputStory projectId = {this.props.projectId} onSubmit = {this.addNewStory}/> 
            deleteProjectButton = <DeleteProject projectId={this.props.projectId}/>;
        }
        if(hasStories && this.state.stories.length!==0){
            storiesList = this.state.stories.map((storyObj)=>
            (
                <StoryCard
                    userRoles = {this.state.userRoles}
                    storyObj = {storyObj}
                    key = {storyObj._id}
                    userId = {this.props.userId}
                    edit = {this.state.edit}
                    delete = {this.deleteNewStory}
                    onEdit = {this.editStory}
                    onEditImage = {this.editImage}
                    onAddLink = {this.editLinks}
                />
            ));
        } else if( hasStories && this.state.stories.length===0){
            storiesList = (
                <SampleStoryCard/>
            )
        }
        //console.log(this.state.stories[0]._id)
        //console.log(typeof this.state.stories[0]._id)
        let storyTelling;
        if(this.state.isStoryTelling && this.state.stories && this.state.stories.length!==0) {
            console.log("Got into story telling");
            storyTelling = (<SingleDisplay stories = {this.state.stories}/>);
        } else {
            storyTelling = (<></>);
        }
        console.log("storyTelling is"+storyTelling);


        //handles a string that lists collaborators names
        let userNames = undefined;
        if(this.state.userRoles) {
            userNames = Object.keys(this.state.userRoles).join(", ");
            userNames = "Collaborators: " + userNames;
            console.log(userNames);
        }
        return(
            <>
            <div className="u-flex project-container">
                {storyTelling}
            <div className="projectDocJournal-container">
                <section className="projectDocumentation-container">
                    <h2 className="projectDocumentation-headerTitle">Create your own story.</h2>
                    {this.state.projectObj ?
                        <h3 className="projectInfo-text">{"Project Name: "+this.state.projectObj.name}</h3> 
                        : null
                    }
                    {userNames ? <h3 className="projectInfo-text">{userNames}</h3> : null}
                    <button 
                        className="NewPostInput-button project-buttonPresent u-point"
                        onClick={this.handlePresent}
                    >{`${!this.state.isStoryTelling?"Present StoryCards":"Exit Presentation"}`}</button>
                    {storiesList}
                    <article className="projectButtons-container">
                        {addStoryButton}
                        {deleteProjectButton}
                    </article> 
                </section>
                <section className="projectJournal-container">
                    <Journal 
                        userId ={this.props.userId} 
                        projectId={this.props.projectId} 
                        userRoles={this.state.userRoles} 
                        canSend={this.state.edit}
                        isStoryTelling={this.state.isStoryTelling}
                    />
                </section>
                </div>

            </div>

            </>
        );
    }
}

export default SingleProject;