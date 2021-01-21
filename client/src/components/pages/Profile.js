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
        //The below command was used to trigger LinkPreview API
        //It is temporary placeholder.
        let linkArray = ["https://gumdrops.herokuapp.com/","https://www.youtube.com/watch?v=fn3KWM1kuAw"];
        post('/api/link',{links:linkArray}).then((data)=>console.log(data));
        post('/api/delproject',{projectId:"6007a80f9efb054e58a26af0"});
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
        return <h1>Loading!</h1>
    }
}
export default Profile;