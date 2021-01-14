import React, { Component } from "react";
import "../../utilities.css";

//Props
//userId: String (used in special routing from App.js)

class Profile extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return(
            <div>
                <h2 className='u-textCenter'>Welcome {this.props.userId==="undefined" ? "Anonymous" : this.props.userId}</h2>
            </div>

        );
    }
}
export default Profile;