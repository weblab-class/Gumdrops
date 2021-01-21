import React, { Component } from "react";
import { get, post } from "../../utilities";
import ProfileImage from "../modules/ProfileImage.js";
import ProfileBio from "../modules/ProfileBio.js"
import "../../utilities.css";
import "./Profile.css"

//Props
//userId: String (used in special routing from App.js)
//viewerId: String (identifies the person viewing the profile)
class Profile extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            editing: false,
        };
      }

    clickedEditing=(event)=>{
        event.preventDefault();
        this.setState((prevstate) => ({
            editing: !prevstate.editing,
        }));
    }

    componentDidMount() {
        this._isMounted = true;
        get(`/api/user`, { userid: this.props.userId }).then((user) => {
            if(this._isMounted){
                this.setState({
                    user: user 
                });
            };
        });
        console.log("Preparing profile for user "+this.props.userId)
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        if(this.state.user) {
            if(this.state.editing) {
                return(
                    <>
                        <h2 className="u-textCenter">Welcome, {!this.state.user ? "Anonymous" : this.state.user.name}</h2>
                        <hr></hr>
                        <ProfileImage userId={this.props.userId} editing={this.state.editing}/>
                        <ProfileBio userId={this.props.userId} editing={this.state.editing}/>
                        <button 
                        type = "submit"
                        className = "Profile-edit u-pointer"
                        value = "Submit"
                        onClick={this.clickedEditing}
                        >Done
                    </button>
                    </>
                );
            }
            if(this.props.userId===this.props.viewerId) {
                return(
                    <>
                        <h2 className="u-textCenter">Welcome, {!this.state.user ? "Anonymous" : this.state.user.name}</h2>
                        <hr></hr>
                        <ProfileImage userId={this.props.userId} editing={this.state.editing}/>
                        <ProfileBio userId={this.props.userId} editing={this.state.editing}/>
                        <button 
                            type = "submit"
                            className = "Profile-edit u-pointer"
                            value = "Submit"
                            onClick={this.clickedEditing}
                            >Edit
                        </button>
                    </>
                );
            }
            return(
                <>
                    <h2 className="u-textCenter">Welcome, {!this.state.user ? "Anonymous" : this.state.user.name}</h2>
                    <hr></hr>
                    <ProfileImage userId={this.props.userId} editing={this.state.editing}/>
                    <ProfileBio userId={this.props.userId} editing={this.state.editing}/>
                </>
            );
        }
        return <h1>Loading!</h1>
    }
}
export default Profile;