//project documentation
//this is where you work on your projects 
import React, {Component} from "react";
import { render } from "react-dom";
import "./NewPostInput.css";
import { post } from "../../utilities";
import { get} from "../../utilities";

class StoryCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            storycontent: "",
        };
    }
    //retrieves story 
    componentDidMount(){
    // get("/api/story").then((storyObjs)=>{
    //         this.setState({storycontent: storyObj})
    //     });
    console.log("recovered");
    }
    
    addNewStory =(storyObj)=>{
       
        // post("/api/story", this.state.storycontent).then((story) =>{
        //     this.setState({
        //         storycontent: story,
        //     });
       // });
            this.setState({
                 storycontent: story,
             });   
        }
    

    handleChange = (event) =>{
        this.setState({
            storycontent: this.state.storycontent.concat(event.target.value),
        })
    }
    handleSave = (event) =>{

    }
render(){   
    return(
        <div className ="u-flex">
            <input 
                type = "text"
                placeholder="enter story"
                value = {this.state.value}
                onChange = {this.handleChange}
                className = "NewPostInput-story"
                />
            <button 
                type = "submit"
                className = "NewPostInput-button u-pointer"
                value = "Submit"
                onClick={this.addStory}
                >Save
            </button>
        </div>

        );
    }
}
export default StoryCard;