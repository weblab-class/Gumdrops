//project documentation
//this is where you work on your projects 
import React, {Component} from "react";
import { render } from "react-dom";
import "./NewPostInput.css";
import { post } from "../../utilities";
import { get} from "../../utilities";
/**
 * Proptypes 
 * @param {Object } storyObj : sends story object
 * @param {string}  userId 
 */
class StoryCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            storytext: "",
        };
        
    }
    //runs when storycard mounts
    componentDidMount(){
        this.setState({storytext : this.props.storyObj.textContent},)
    }

    //this would eventually allow to edit stories
    editStory =(storyObjs)=>{
        // const body = {_id: this.props.storyId, content: this.state.storytext}
        // post("/api/editstory",).then((story) =>{
        //     console.log("sent to server");
       // });
       // console.log(this.props.storyObj._Id);
            console.log("story was saved ")
        }
    
        //method that will allow for edit
    handleChange = (event) =>{
        this.setState({
            storytext: event.target.value,
        });
    }
    
    render(){   
        return(
            <div>
                <p>
                    {this.state.storytext}
                </p>
            </div>
        );
    }
}
export default StoryCard;