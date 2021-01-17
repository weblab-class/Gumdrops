import React, { Component } from "react";
import { NewPostInput } from "./NewPostInput.js";

/**
 * NewPostInput is a component for handling input fields within Project
 *
 * Proptypes
 * 
 */
class NewProjectInput extends Component {
  sendMessage = (value) => {
      console.log("I tried to submit "+value);
  };

  render() {
    return <NewPostInput defaultText="" onSubmit={this.sendMessage} />;
  }
}

export default NewProjectInput;
