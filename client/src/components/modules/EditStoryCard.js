import React, {Component } from "react";
import { render } from "react-dom"
import "./NewPostInput.css";
import {post} from "../../utilities";
import "../../utilities.css"
 
/**
 * Edit Story Card allows editing of a specific story card
 * 
 * Proptypes 
 * @param {Object} storyObj : story card object
 * @param {function} onEdit : function called edit is saved 
 * @param {Boolean} editImage : true if being used to edit image
 */
class EditStoryCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            content:"",
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
    handleChangeImage = (event) => {
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
    handleSubmit = (event) => {
        if(this.state.selectedFile==null) { /*do nothing*/ } 
        else {
            event.preventDefault();
            console.log("Tries to submit");
            //let base64_img = this.state.selectedFile.toString('base64');
            //console.log("Base 64 conversion of image file: "+base64_img.substr(0,200));
            let changes = {imageMedia:this.state.selectedFile};
            this.props.onEdit && this.props.onEdit(changes);
        }
    };

    //handles typing 
    handleChange = (event)=>{
        this.setState({
            content: event.target.value
        });
    }
    //handles saving changes
    handleSave = (event)=>{
        event.preventDefault();
        const changes = {textContent:this.state.content};
        this.props.onEdit && this.props.onEdit(changes);
    }
    //initializes stats
    initState = (storyObj)=>{
        this.setState({
            content:this.props.storyObj.textContent,
        });
    }
    // this is run when EditStoryCard mount
    componentDidMount(){
        this.initState(this.props.storyObj);
    }
    
    render(){
        if(this.props.editImage){
            return (
                <div className="NewPostInput-container">
                    <input
                        type="file"
                        name="files[]"
                        accept="image/*"
                        key={this.state.submitKey}
                        onChange={this.handleChangeImage}
                        className="NewPostInput-input NewPostInput-storyImage"
                    />
                    <button
                        type="submit"
                        className="NewPostInput-button NewPostInput-storyButton u-pointer"
                        value="Submit"
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            );
        }
        return(
            <div className ="u-flex">
                <input 
                type = "text"
                placeholder="enter story"
                value = {this.state.content}
                onChange = {this.handleChange}
                className = "NewPostInput-story"
                /><button 
                type = "submit"
                className = "NewPostInput-button u-pointer "
                value = "Submit"
                onClick={this.handleSave}
                >Save
                </button>
            </div> 
        )
    }
}
export default EditStoryCard