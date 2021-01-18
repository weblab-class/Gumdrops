import React, { Component } from "react";
import { get } from "../../utilities";
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
        };
      }
      
    handleInit = () =>{
        // if(this.props.userId) {
        //     console.log("Going into handleInit with profile");
        //     get("/api/profile",{ userid:this.props.userId })
        //     .then((profile)=>{
        //         this.setState({
        //             profile: profile,
        //         })
        //     });
        // }   
        console.log("Preparing profile for user "+this.props.userId)
    }
    componentDidMount() {
        get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
        this.handleInit();
    }

    render() {
        if(this.state.user) {
            return(
                <>
                    <div>
                        <h2 className='u-textCenter'>Welcome, {!this.state.user ? "Anonymous" : this.state.user.name}</h2>
                    </div>
                    <ProfileImage userId={this.props.userId}/>
                    <ProfileBio userId={this.props.userId}/>
                </>
            );
        }
        return <h1>Loading!</h1>
    }
}
export default Profile;