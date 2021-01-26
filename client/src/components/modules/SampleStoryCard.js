import React, {Component} from "react";
import LinkBlock from "./LinkBlock.js";
import SingleText from "./SingleText.js";
// import Image from "../../public/"
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
        // let picture = (
        //     <section className="StoryCard-imageBlockContainer">
        //         <img 
        //             style={{height: "75", width: "75%", objectFit: "contain"}}
        //             src={this.state.image}
        //             className="StoryCard-center"
        //         />
        //     </section>
        // );
        return(
            <div className = "u-flex StoryCard-container">
                {/* {picture} */}
                <section className="StoryCard-textBlockContainer">
                    {text}
                </section>
                <section className="StoryCard-linkBlockContainer">
                    {/* <LinkBlock          //this is here if we add links
                        onEdit= {this.editLink}
                        editing = {this.state.editing} 
                        linkArr = {this.props.storyObj.links}
                        onDel = {this.deleteLink}
                    /> */}
                </section>
            </div>
        );
     }
 }
 export default SampleStoryCard;