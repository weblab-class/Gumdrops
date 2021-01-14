import React, { Component } from "react";
import {Link} from "@reach/router";

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
                <Link to="/">Home</Link>
                <Link to="/explore">Explore</Link>
                <Link to="/projects">Projects</Link>
                <Link to={"/profile/"+this.props.userId}>Profile</Link>
            </div>
        </nav>);
    }
}
export default NavBar;