import React, {Component} from "react";
import LinkBlock from "./LinkBlock.js";
import SingleText from "./SingleText.js";
import Image from "../../public/GumdropsLogo.png";
import "./NewPostInput.css";
import "./StoryCard.css";

/**
 * Sample Story Card this renders when no story card have been made 
 * Proptypes 
 * no props
 */
 class SampleStoryCard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const picture = (
            <section className="StoryCard-imageBlockContainer">
                <img 
                    style={{height: "75", width: "75%", objectFit: "contain"}}
                    src={Image}
                    className="StoryCard-center"
                />
            </section>
        );
        const text = (
            <section className="StoryCard-textBlockContainer">
                Welcome to gumdrops, share you story with us. Please click "Add New Story!!" to begin or click any of the links for more information
            </section>
        );
        const links = (
            <section className="StoryCard-linkBlockContainer">
                <LinkBlock
                    editing = {false}
                    linkArr = {["https://docs.google.com/document/d/1k3spUBQJzej7Bn2oiRdaK7IfFao95RBbjgmgJc3FWZw/edit?usp=sharing"]}
                />
            </section>
        );
        return(
            <div className = "u-flex StoryCard-container">
                {picture}
                {text}
                {links}
            </div>
        );
     }
 }
 export default SampleStoryCard;