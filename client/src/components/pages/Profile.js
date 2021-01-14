import React, { Component } from "react";
import { get } from "../../utilities";
import "../../utilities.css";

//Props
//userId: String (used in special routing from App.js)

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
        };
      }
    
    componentDidMount() {
        get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
    }
    render() {
        return(
            <div>
                <h2 className='u-textCenter'>Welcome {!this.state.user ? "Anonymous" : this.state.user.name}</h2>
            </div>
        );
    }
}
export default Profile;