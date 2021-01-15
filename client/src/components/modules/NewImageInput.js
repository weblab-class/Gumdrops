import React, { Component } from "react";
import "../../utilities.css";
import "./NewPostInput.css";
import { get, post } from "../../utilities";

/**
 * New Image Input is a component for picture inputs
 *
 * Proptypes
 */

class NewImageInput extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        selectedFile: null,
        fileName: null,
        submitKey : Date.now(),
      };
    }
  
    // called whenever the user types in the new post input box
    handleChange = (event) => {
        console.log(event.target.files);
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            fileName: event.target.files[0].name,
            loaded: 0,
        });
        console.log("Change handled. File selected is now: "+event.target.files[0].name);
        console.log("Type of file:"+typeof(event.target.files[0]));
    };
  
    // called when the user hits "Submit" for a new post
    handleSubmit = () => {
        if(this.state.selectedFile==null) { /*do nothing*/ } 
        else {
        let base64_img = this.state.selectedFile.toString('base64');
        console.log("Base 64 conversion of image file: "+base64_img.substr(0,200));
        let postObj = { 
            projectId: "123456", //hard coded for now
            cardId : "abcdefg",
            image: base64_img,
            imageName: this.state.fileName,
        };
        post("/api/image",postObj).then(get("/api/image",{})).then((img)=>console.log(img.image));
        this.setState({
            selectedFile: null,
            submitKey : Date.now(),
        });
        }
    };
  
    render() {
      return (
        <div className="u-flex">
          <input
            type="file"
            name="file"
            key={this.state.submitKey}
            onChange={this.handleChange}
            className="NewPostInput-input"
          />
          <button
            type="submit"
            className="NewPostInput-button u-pointer"
            value="Submit"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      );
    }
  }

export default NewImageInput;
