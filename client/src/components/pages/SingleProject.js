//single project 
import React, { Component} from "react";
import StoryCard from "../modules/StoryCard";
import { get } from "../../utilities";
import { Link } from "@reach/router";
//this would be used to render what you see w
//when you open a project 

//Props
//projectId : String, identifying what project it is
//userId: String, identifying id of current user (undefined if not)

class SingleProject extends Component{
    constructor(props){
        super.props(props);
    }

    //called when "SingleProject" mounts
    componentDidMount(){
    }
   
    render(){
        return(
            <>
            <StoryCard userId = {this.props.userId}/>
            </>
        );
    }
}
export default SingleProject;