import React, { Component } from "react";
import {Link} from "@reach/router";

import "./NavBar.css";
//Props
//userId: String

class NavBar extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        console.log(this.props.userId);
        return(
        <nav className="NavBar-container">
            <div className="NavBar-title u-inlineBlock">Gumdrops</div> 
            <div className="NavBar-linkContainer u-inlineBlock">
                <Link to="/" className="NavBar-link">Home</Link>
                <Link to="/explore" className="NavBar-link">Explore</Link>
                <Link to="/projects" className="NavBar-link">Projects</Link>
                <Link to={"/profile/"+this.props.userId} className="NavBar-link">Profile</Link>
            </div>
        </nav>);
    }
}
export default NavBar;