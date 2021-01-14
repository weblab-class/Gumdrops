import React, { Component } from "react";
import {Link} from "@reach/router";

import "./NavBar.css";

class NavBar extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return(
        <nav className="NavBar-container">
            <div className="NavBar-title u-inlineBlock">Gumdrops</div> 
            <div className="NavBar-linkContainer u-inlineBlock">
                <Link to="/" className="NavBar-link">Home</Link>
                <Link to="/explore" className="NavBar-link">Explore</Link>
                <Link to="/projects" className="NavBar-link">Projects</Link>
                <Link to="/profile" className="NavBar-link">Profile</Link>
            </div>
        </nav>);
    }
}
export default NavBar;