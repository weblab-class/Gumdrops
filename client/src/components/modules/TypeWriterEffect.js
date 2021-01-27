import React, {Component} from "react";
import "./NewPostInput.css";
import "./StoryCard.css";
import "./TypeWriterEffect.css";
/**
 * 
 * Type Writer Effect, this the slide show for each of 
 * the stoycards 
 * Proptyes 
 * @param {[]} stories : the text you want to display
 * @param {buffer} image: the image you want to display
 * 
 */

 class TypeWriterEffect extends Component{
     constructor(props){
         super(props);
         this.state = {
            text : this.props.stories,
            images: this.props.images,
            blink: true,
            storyindex : 0,
            sentenceindex : 0,
            letterindex:0,
         };
    }
    componentDidMount(){
        this.timeoutID = this.timer();
    }
    timer = ()=>setTimeout(()=>{
        console.log("timeoutran");
        this.setState((prev)=>({
            letterindex: prev.letterindex+1,
            blink: !prev.blink,
        }));
    },100)
    timer2 = ()=>setTimeout(()=>{this.setState((prevState)=>({
        storyindex : prevState.storyindex+1,
        sentenceindex: 0,
        displayArr:[],
        letterindex: 0,
    }));
    console.log("this the end of one story card")},2000);
    componentDidUpdate(){
        
        if(this.state.storyindex >= this.state.text.length -1 && this.state.sentenceindex >= this.state.text[this.state.storyindex].length-1 && this.state.letterindex >= this.state.text[this.state.storyindex][this.state.sentenceindex].length ){ console.log("end of storycards")
        return}

        if(this.state.sentenceindex >= this.state.text[this.state.storyindex].length-1 && this.state.letterindex >= this.state.text[this.state.storyindex][this.state.sentenceindex].length){
            
            this.timeoutID2 = this.timer2();
            return
        }

        if(this.state.letterindex >= this.state.text[this.state.storyindex][this.state.sentenceindex].length){
            
            
            this.setState((prevState)=>({
                sentenceindex: prevState.sentenceindex+1,
                letterindex:0,
            }));
            
            console.log("this is the end of ten words");
            return;
       }
       this.timeoutID = this.timer();
    }
    componentWillUnmount(){
        clearTimeout(this.timeoutID);
        clearTimeout(this.timeoutID2);
    }
    render(){
        let topDisplay = [];
        for(let i = 0; i<this.state.sentenceindex ; i++){
            topDisplay.push(this.state.text[this.state.storyindex][i]);
            if(topDisplay.length>5){
                topDisplay.splice(0,1);
            }
        }
        let displayList = "";
        if(topDisplay.length!==0){
            displayList = topDisplay.map((sentence,i)=>
                (<h1 className = "Effect-text" key = {i} >{sentence}</h1>)
            )
        }
        
        return(
            <>  
            
                <span className = "Effect-imageContainer">
                <img className = " Effect-image"src = {this.state.images[this.state.storyindex]}/>
                </span >
                <span className = "Effect-textContainer">
                    {displayList}
                    <h1 className = "Effect-text">{`${this.state.text[this.state.storyindex][this.state.sentenceindex].substring(0,this.state.letterindex)}${this.state.blink?"|":" "}`}</h1>
                </span>
            
            </>
        )
    }
         
     
 }
 export default TypeWriterEffect;