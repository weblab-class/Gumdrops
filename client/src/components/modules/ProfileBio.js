import React, { Component } from "react";
import { get } from "../../utilities";
import { NewBio } from "./NewPostInput.js";
import { socket } from "../../client-socket.js";
import "../../utilities.css";
import "../pages/Profile.css"

//Props
//userId: String (passed down from Profile.js)
//editing: Boolean (if user is currently editing their profile)
class ProfileBio extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            bio: undefined,
        };
      }
    
    componentDidMount() {
        this._isMounted = true;
        
        if(this.props.userId) {
            console.log("Going into handleInit with profile bio");
            get("/api/profile-bio",{ userId:this.props.userId })
            .then((bio)=>{
                if(this._isMounted){
                    this.setState({
                        bio: bio.content,
                    });
                };
            });
        }   

        socket.on("profile-bio", (bio) => {
            if ((bio.userId === this.props.userId) && this._isMounted) {
                this.setState({
                    bio : bio.content,
                });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if (this.state.bio) {
            if (this.props.editing) {
                return(
                    <>
                        <div className="Profile-sectionContainer">
                            <h2 className="u-textCenter new-h2 Profile-subHeading">Bio:</h2>
                            <p className="u-textCenter">{this.state.bio}</p>
                        </div>
                        <div className="Profile-bioContainer">
                            <NewBio userId={this.props.userId}/>
                        </div>
                    </>
                );
            }
            return(
                <div className="Profile-sectionContainer">
                    <h2 className="u-textCenter new-h2 Profile-subHeading">Bio:</h2>
                    <p className="u-textCenter">{this.state.bio}</p>
                </div>
            );
        }
        if(this.props.editing){
            return (
                <div className="Profile-bioContainer">
                    <h2 className="u-textCenter new-h2 Profile-subHeading">Bio:</h2>
                    <NewBio userId={this.props.userId}/>
                </div>
            );
        }
        return (
            <div className="Profile-bioContainer">
                <h2 className="u-textCenter new-h2 Profile-subHeading">Bio:</h2>
                <p className="u-textCenter">No bio added yet</p>
            </div>
        );
    }
}
export default ProfileBio;