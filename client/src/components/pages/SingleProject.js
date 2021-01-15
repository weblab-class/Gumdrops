//single project 
import React, { Component} from "react";
import StoryCard from "../modules/StoryCard";
import { get } from "../../utilities";
import { Link } from "@reach/router";
//this would be used to render what you see w
//when you open a project 
class SingleProject extends Component{
    constructor(props){
        super.props(props);
        
    }

    //called when "SingleProject" mounts
    componentDidMount(){
           document.title = "Single Project";
        
    }
   
    render(){
        return(
            <>
            <StoryCard userId = {this.props.userId}/>
            </>
        );
    }
}