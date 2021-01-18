import React, { Component } from "react";
import { NewPostInput } from "./NewPostInput.js";
import "../../utilities.css";
import "./NewProjectInput.css";
/**
 * NewPostInput is a component for handling input fields within Project. This is very similar to NewPostInput
 * but with modified styling and submit functionality
 * 
 * Proptypes
 * 
 */
class NewProjectInput extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          value: "",
        };
    }
    // called whenever the user types in the new post input box
    handleChange = (event) => {
        this.setState({
        value: event.target.value,
        });
    };    

    // called when the user hits "Submit" for a new post
    handleSubmit = (event) => {
        event.preventDefault();
        this.onSubmit && this.onSubmit(this.state.value);
        this.setState({
            value: "",
        });
    };

  sendMessage = (value) => {
      console.log("I tried to submit "+value);
  };

  render() {
    return(      
    <div className="u-flex u-flex-justifyCenter">
        <input
            type="text"
            placeholder={this.props.defaultText}
            value={this.state.value}
            onChange={this.handleChange}
            className="NewProjectInput-input"
        />

    </div>);
  }
}

export default NewProjectInput;
