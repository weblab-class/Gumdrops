import React, {Component} from "react";
import LinkBlock from "./LinkBlock.js";
import SingleText from "./SingleText.js";
import "./NewPostInput.css";
import "./StoryCard.css";

/**
 * Sample Story Card this renders when no story card have been made 
 * Proptypes 
 * no props
 */

 class SampleStoryCard extends Component{
     costructor(){
         
     }
     render(){
         let text = "Welcome to gumdrops, share you story with us. Please click  add story cards to begin or click any of the links for more information";
        return(
            <div className = "u-flex StoryCard-container">
                {/* {picture} */}
                <section className="StoryCard-textBlockContainer">
                    {text}
                </section>
                <section className="StoryCard-linkBlockContainer">
                    {/* <LinkBlock  
                        onEdit= {this.editLink}
                        editing = {this.state.editing} 
                        linkArr = {this.props.storyObj.links}
                        onDel = {this.deleteLink}
                    /> */}
                    {/* this is here if we add links */}
                </section>
            </div>
        );
     }
 }
 export default SampleStoryCard;