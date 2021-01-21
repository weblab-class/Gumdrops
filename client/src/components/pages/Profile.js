import React, { Component } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./Profile.css"
import ProfileImage from "../modules/ProfileImage.js";
import ProfileBio from "../modules/ProfileBio.js"



//Props
//userId: String (used in special routing from App.js)

class Profile extends Component {
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
        get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
        console.log("Preparing profile for user "+this.props.userId)
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
            let myStyle = {color:"red",backgroundColor:"lightyellow",fontWeight:"bold",fontSize:"5em"};
            return(
                <>
                    <h2 className="u-textCenter">Welcome, {!this.state.user ? "Anonymous" : this.state.user.name}</h2>
                    <p style={myStyle}>This is a sample text</p>
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
        return <h1>Loading!</h1>
    }
}
export default Profile;