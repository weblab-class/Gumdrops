import React, { Component } from "react";

//Props
//userId: String (used in special routing from App.js)

class Profile extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return(
            <div>
                <h1>Welcome {this.props.userId==="undefined" ? "Anonymous" : this.props.userId}</h1>
            </div>

        );
    }
}
export default Profile;