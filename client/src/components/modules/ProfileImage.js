import React, { Component } from "react";
import { get } from "../../utilities";
import NewProfileImageInput from "./NewProfileImageInput.js";
import { socket } from "../../client-socket.js";
import "../../utilities.css";
import "../pages/Profile.css"

//Props
//userId: String (passed down from Profile.js)

class ProfileImage extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            image: undefined,
        };
      }

    componentDidMount() {
        this._isMounted = true;
        if(this.props.userId) {
            console.log("Going into handleInit with profile image");
            get("/api/image",{ userId : this.props.userId })
            .then((pic)=>{
                this.setState({
                    image : pic.image,
                })
            });
        }   

        socket.on("profile-image", (pic) => {
            console.log("Recieved image socket request");
            if ((pic.userId === this.props.userId) && this._isMounted) {
                this.setState({
                    image : pic.image,
                });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if (this.state.image) {
            console.log("Attempting to display image: "+this.state.image)
            return(
                <>
                    <div className="Profile-sectionContainer">
                        <h2 className="u-textCenter h2">Profile Pic:</h2>
                        <img 
                            style={{height: "15%", width: "15%", objectFit: "contain"}} 
                            src={this.state.image}
                            className="Profile-image"
                        />
                    </div>
                    <div className="Profile-imageInputContainer">
                        <NewProfileImageInput userId={this.props.userId}/>
                    </div>
                </>
            );
        }
        return (
            <div className="Profile-imageInputContainer">
                <h2 className="u-textCenter new-h2">Profile Pic:</h2>
                <NewProfileImageInput userId={this.props.userId}/>
            </div>
        );
    }
}
export default ProfileImage;