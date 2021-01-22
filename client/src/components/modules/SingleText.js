import React, {Component} from "react";
import "../../utilities.css";
import "./StoryCard.css"
/**
 * Single Text this renders the text on the story
 * cards  
 * 
 * Proptypes
 * @param {string} defaultText placeHolder Text
 * @param {String} prevStory: already existing story
 * @param {boolean} isEditing: tells the user if you are editing
 * @param {()=>} function: onSubmit 
 */
class SingleText extends Component{
    constructor(props){
        super(props);
        this.state={
            tempvalue: this.props.prevStory,
        }
    }
    //called whenver the user types in the input box
    handleChange = (event)=>{
        this.setState({
            tempvalue: event.target.value,
        })
    }
    //called when the user hit the button
    handleSubmit = (event)=>{
        event.preventDefault();
        // console.log("sent from input box")
        // console.log(this.state.tempvalue)
        this.props.onSubmit && this.props.onSubmit(this.state.tempvalue);
    }
    componentDidMount(){
        // console.log(this.state.tempvalue);
        // console.log(this.props.prevStory);
    }

    render(){
        let story =(<> {this.state.tempvalue}</>);
        if(this.props.isEditing){
            story =(
                <>
                <textarea
                rows = "6"
                type= {this.props.type}
                placeholder={this.props.defaultText}
                value={this.state.tempvalue}
                onChange={this.handleChange}
                className="u-flex StoryCard-textAreaContainer"
                />
                <button
                type="submit"
                className="u-flex StoryCard-margin"
                value="Submit"
                onClick={this.handleSubmit}
                >
                Save
                </button>
            </>
            )
        }
        return(
            <>
            {story}
            </>
        )
    }
}
export default SingleText;