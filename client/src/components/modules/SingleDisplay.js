import React, {Component} from "react";
import "./NewPostInput.css";
import "./StoryCard.css";
import TypeWriterEffect from "./TypeWriterEffect.js";
import { retrieveStoryCardImg } from "../../utilities.js";
/** 
 * Single Display: this displays the animation
 * 
 * Proptypes 
 * @param {[]} stories: an array of storycards 
 * 
 */

 class SingleDisplay extends Component{
     constructor(props){
         super(props);
         // one array is for the images the other for
         //the stories already formatted
         this.state={
             images :undefined,
             stories : undefined,
         }
     }
     //formats stories to be rendered nicely
     formatStories = (storyArr)=>{
         let tempArr = [];
         
         
         for(let i = 0; i<storyArr.length; i++){
            let tempy = storyArr[i].split(" ");
            let tempo = "";
            let format = [];
            for(let j = 0 ; j< tempy.length; j++){
                tempo = tempo.concat(" "+tempy[j]);
                if(j!==0 && j%8==0){
                    format.push(tempo);
                    tempo = ""
                }
            }
            format.push(tempo);
            tempArr.push(format)
         }
         this.setState({
             stories:tempArr,
         })
     }
     //get all the stories
     getStories=()=>{
        let tempArr = [];
        for(let i = 0 ; i<this.props.stories.length; i++){
            tempArr.push(this.props.stories[i].textContent)
        }
        this.formatStories(tempArr);
     }

     getImages = () => {
        let imgArr = []; //to contain Strings representing URL-encoded image data. Use as <img src={imageData}/>
        console.log(this.props.stories);
        for(let i=0; i<this.props.stories.length;i++) {
            imgArr.push(this.props.stories[i].imageMedia);
        }
        this.setState({
            images: imgArr,
        });
     }

     componentDidMount(){
        this.getStories();
        this.getImages();
     }

     render(){
         let storiesList = "";
         if(this.state.stories){
             console.log(this.state.stories)
             storiesList = (<TypeWriterEffect stories = {this.state.stories} images={this.state.images}/>)
         }
         return(
         <div>
             {storiesList}
         </div>
         )
     }
 }
 export default SingleDisplay;