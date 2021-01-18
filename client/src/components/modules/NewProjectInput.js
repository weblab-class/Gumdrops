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
    }

  render() {
    return(      
    <div className="u-flex u-flex-justifyCenter">
        <input
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
            className="NewProjectInput-input"
        />
    </div>);
  }
}

export default NewProjectInput;
