import React, { Component } from "react";
import "../../utilities.css";
import "./NewProjectInput.css";
import { get, post } from "../../utilities";

/**
 * New Image Input is a component for picture inputs
 * 
 * Proptypes
 * @param {function} handleChange .Used as a callback to update CreateProject
 */

class NewThumbnailInput extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        submitKey : Date.now(),
      };
    }

    //handles reading from an File object and ensuring image type
    readImage = (blob) => {
      return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onloadend = () => {
          if (r.error) {
            reject(r.error.message);
            return;
          } else if (r.result.length < 50) {
            // too short. probably just failed to read, or ridiculously small image
            reject("small image? or truncated response");
            return;
          } else if (!r.result.startsWith("data:image/")) {
            reject("not an image!");
            return;
          } else {
            resolve(r.result);
          }
        };
        r.readAsDataURL(blob);
      });
    };

    // called whenever the user chooses a new image in the input box
    handleChange = (event) => {
      console.log(event.target.files);
      console.log(event.target.files[0]);

      const fileInput = event.target;
      this.readImage(fileInput.files[0]).then(image => {
        this.props.onChange(image);
        //console.log("Change handled. File selected is now: "+image);
        console.log("Loaded image "+image);
        console.log("Name of file"+fileInput.files[0].name)
        console.log("Type of file:"+typeof(fileInput.files[0]));
      }).catch(err => {
        console.log(err);
      });

    };
  
    render() {
      return (
        <input
            type="file"
            name="files[]"
            accept="image/*"
            key={this.state.submitKey}
            onChange={this.handleChange}
            className="NewProjectInput-input"
        />
      );
    }
  }

export default NewThumbnailInput;
