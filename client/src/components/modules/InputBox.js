import React, {Component} from "react";
import "../../utilities.css";
import "./StoryCard.css"
/**
 * Input Box and Save Box 
 * 
 * Proptypes
 * @param {string} defaultText placeHolder Text
 * @param {string} type: type of input box 
 * @param {()=>} function: onSubmit 
 * @param {string} buttonMessage : what would be displayed on the button 
 */
class InputBox extends Component{
    constructor(props){
        super(props);
        this.state={
            value: "",
        }
    }
    //called whenver the user types in the input box
    handleChange = (event)=>{
        this.setState({
            value: event.target.value,
        })
    }
    //called when the user hit the button
    handleSubmit = (event)=>{
        event.preventDefault();
        console.log("sent from input box")
        console.log(this.state.value)
        this.props.onSubmit && this.props.onSubmit(this.state.value);
        this.setState({
            value: "",
        });
    }
    render(){
        return(
            <div className="u-flex StoryCard-linkinputC">
                <input
                type= {this.props.type}
                placeholder={this.props.defaultText}
                value={this.state.value}
                onChange={this.handleChange}
                className="u-flex"
                />
                <button
                type="submit"
                className="u-flex"
                value="Submit"
                onClick={this.handleSubmit}
                >
                {this.props.buttonMessage}
                </button>
            </div>
        )
    }
}
export default InputBox;