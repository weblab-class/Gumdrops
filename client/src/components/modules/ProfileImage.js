import React, { Component } from "react";
import { get } from "../../utilities";
import "../../utilities.css";
import "../pages/Profile.css"
import NewProfileImageInput from "./NewProfileImageInput.js";

//Props
//userId: String (passed down from Profile.js)

class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: undefined,
        };
      }

    componentDidMount() {
        if(this.props.userId) {
            console.log("Going into handleInit with profile image");
            get("/api/image",{ userId : this.props.userId })
            .then((image)=>{
                this.setState({
                    image: image.image,
                })
            });
        }   
    }

    render() {
        if (this.state.image) {
            console.log("Attempting to display image: "+this.state.image)
            return(
                <img 
                    style={{height: "15%", width: "15%", objectFit: "contain"}} 
                    src={this.state.image}
                    className="Profile-image"
                />
            );
        }
        return (
            <div className="Profile-imageInputContainer">
                <NewProfileImageInput userId={this.props.userId}/>
            </div>
        );
    }
}
export default ProfileImage;