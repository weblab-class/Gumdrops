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
        }
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
            get("/api/users-ids",{projectId: this.props.projectId}).then((idArr)=>{
                let tempArr = idArr;
                for( let i = 0; i, i<tempArr.length; i++){
                    let body = {userId: tempArr[i], changes:{views:1}}
                    post("/api/rewardinc",body).then((newData)=>{
                    
                    });
                }
            })
            if(!this.viewCounted){
                console.log("View counted");
                let body2= {projectId:this.props.projectId,changes:{views:1}};
                post("/api/projectinc",body2).then((sent)=>{
                    console.log("succes")
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
        return(
            <>
            <div className="u-flex project-container"> 
                <section className="projectDocumentation-container">
                    <h2 className="projectDocumentation-headerTitle">Create your own story.</h2>
                    {storiesList}
                    {addStoryButton}
                    {deleteProjectButton}
                </section>
                <section className="projectJournal-container">
                    <Journal userId ={this.props.userId} projectId={this.props.projectId} userRoles={this.state.userRoles} canSend={this.state.edit}/>
                </section>
            </div>

            </>
        );
    }
}

export default SingleProject;