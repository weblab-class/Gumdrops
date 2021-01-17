//project documentation
//this is where you work on your projects 
import React, {Component} from "react";
import { render } from "react-dom";
import "./NewPostInput.css";
import { post } from "../../utilities";
import { get} from "../../utilities";
/**
 * Proptypes 
 * @params {string } storyObj : sends story object
 * @params {string}  userId
 */
class StoryCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            storytext: "",
        };
        console.log("i constructed")
    }
    //retrieves story with a get request
    componentDidMount(){
        this.setState({storytext : this.props.storyObj.textcontent},)
    console.log("recovered");
    }

    //edit database sends new test and same id
    editStory =(storyObjs)=>{
        // const body = {_id: this.props.storyId, content: this.state.storytext}
        // post("/api/editstory",).then((story) =>{
        //     console.log("sent to server");
       // });
       // console.log(this.props.storyObj._Id);
            console.log("story was")
        }
    
        //handles typing 
    handleChange = (event) =>{
        
        this.setState({
            storytext: event.target.value,
        });
    }
    

    
    render(){   
        return(
            //add logic later user matches 
            <div className ="u-flex">
                <input 

                   type = "text"
                    placeholder="enter story"
                    value = {this.state.storytext}
                    onChange = {this.handleChange}
                    className = "NewPostInput-story"

                    />

                <button 
                    type = "submit"
                    className = "NewPostInput-button u-pointer"
                    value = "Submit"
                    onClick={this.editStory}
                    >Save
                </button>
            </div>

        );
    }
}
export default StoryCard;