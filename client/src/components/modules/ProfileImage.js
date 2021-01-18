import React, { Component } from "react";
import { get } from "../../utilities";
import "../../utilities.css";
import "../pages/Profile.css"
import NewProfileImageInput from "../modules/NewProfileImageInput.js";

//Props
//userId: String (used in special routing from App.js)

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
            get("/api/image",{ userid:this.props.userId })
            .then((image)=>{
                this.setState({
                    image: image,
                })
            });
        }   
    }

    render() {
        if (this.state.image) {
            return(
                <div className="Profile-imageContainer Profile-image">
                    <img src={this.state.image}/>
                </div>
            );
        }
        return (
            <div className="Profile-imageContainer">
                <NewProfileImageInput userId={this.props.userId}/>
            </div>
        );
    }
}
export default ProfileImage;