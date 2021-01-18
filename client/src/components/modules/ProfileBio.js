import React, { Component } from "react";
import { get } from "../../utilities";
import "../../utilities.css";
import "../pages/Profile.css"
import { NewBio } from "./NewPostInput.js";

//Props
//userId: String (passed down from Profile.js)

class ProfileBio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: undefined,
        };
      }

    componentDidMount() {
        if(this.props.userId) {
            console.log("Going into handleInit with profile bio");
            get("/api/profile-bio",{ userId:this.props.userId })
            .then((bio)=>{
                this.setState({
                    bio: bio.content,
                })
            });
        }   
    }

    render() {
        if (this.state.bio) {
            console.log("Bio: "+this.state.bio);
            return(
                <div className="Profile-bio">
                    <h2 className="u-textCenter h2">Bio:</h2>
                    <p className="u-textCenter">{this.state.bio}</p>
                </div>
            );
        }
        return (
            <div className="Profile-bioContainer">
                <NewBio userId={this.props.userId}/>
            </div>
        );
    }
}
export default ProfileBio;