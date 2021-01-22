import React, { Component} from "react";
import { render } from "react-dom";
import { Link } from "@reach/router";
import ExitButton from "../../public/ximage.png";
import "../../utilities.css";
import "./StoryCard.css";
/**
 * Single Link add all the properites to a link 
 * 
 * Proptypes 
 * @param {Object} linkObj: sends the link object 
 * @param {Boolean} editing: whether user is editing right not
 * @param {Function} onDelete: deletes the link
 */
class SingleLink extends Component{
    constructor(props){
        super(props);
    }
    deleteLink=(value)=>{
        console.log("clicked")
        value.preventDefault();
        this.props.onDelete && this.props.onDelete(this.props.linkObj.url);
    }
    render(){
        let icon=(<h3>{this.props.linkObj.title}</h3>);
        let istherefavicon = this.props.linkObj.favicons.length!==0;
        if(istherefavicon){
            icon = (
                <div>
                    <img 
                        className="StoryCard-centerEditing" 
                        src={this.props.linkObj.favicons[0]} 
                        style={{height: "25%", width: "25%", objectFit: "contain"}}
                    />
                    <p className="StoryCard-centerEditing u-textCenter">
                        {this.props.linkObj.title}
                    </p>
                </div>
            );
        }
        if(this.props.editing){
            return(
                <div className = "u-flex">
                    <a href={this.props.linkObj.url} className="StoryCard-iconContainer">
                        {icon}
                    </a>
                    <button className = "StoryCard-imagebuttonContainer">
                        <img 
                            src = {ExitButton}
                            alt = "my image"
                            onClick= {this.deleteLink}
                            className = "StoryCard-ximgContainer"
                        />
                    </button>
                </div>  
            );
        }
        else{
            return(
                <div className = "u-flex StoryCard-iconContainer">
                    <a href={this.props.linkObj.url} className="StoryCard-iconContainer">
                    {icon}
                    </a>
                </div>     
            );
        }
    }
}
export default SingleLink;