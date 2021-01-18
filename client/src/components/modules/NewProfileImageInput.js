import React, { Component } from "react";
import "../../utilities.css";
import "./NewPostInput.css";
import { get, post } from "../../utilities";

/**
 * New Image Input is a component for picture inputs
 *
 * Proptypes
 * //userId : String (passed down from ProfileImage.js)
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


    // called whenever the user types in the new post input box
    handleChange = (event) => {
      console.log(event.target.files);
      console.log(event.target.files[0]);

      const fileInput = event.target;
      this.readImage(fileInput.files[0]).then(image => {
        this.setState({
          selectedFile: image,
          fileName: fileInput.files[0].name,
        });
        //console.log("Change handled. File selected is now: "+image);
        console.log("Loaded image "+image);
        console.log("Name of file: "+fileInput.files[0].name)
        console.log("Type of file: "+typeof(fileInput.files[0]));
      }).catch(err => {
        console.log(err);
      });

    };
  
    // called when the user hits "Submit" for a new post
    handleSubmit = () => {
        if(this.state.selectedFile==null) { /*do nothing*/ } 
        else {
        console.log("Tries to submit");
        //let base64_img = this.state.selectedFile.toString('base64');
        //console.log("Base 64 conversion of image file: "+base64_img.substr(0,200));
        let postObj = { 
            userId: this.props.userId,
            image: this.state.selectedFile,
        };
        post("/api/image", postObj).then(()=>console.log("Image was saved"));
        this.setState({
            selectedFile: null,
            submitKey : Date.now(),
        });
        }
    };
  
    render() {
      return (
        <>
          <input
            type="file"
            name="files[]"
            accept="image/*"
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
        </>
      );
    }
  }

export default NewImageInput;
