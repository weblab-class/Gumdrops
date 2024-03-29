import React, { Component } from "react";
import {Link} from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./NavBar.css";
import Logo from "../public/GumdropsIcon_Transparent.png";
import { applyThemeFromLocalStorage  } from "../utilities.js";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "645405290237-qdttkk69k3hubem22c5bm8cf356qr2vg.apps.googleusercontent.com";

//Props
//userId: String
//modeValue: String signifies whether website is in Dark or Light mode

class NavBar extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        if(localStorage.getItem("loggedin")==="true") {
            applyThemeFromLocalStorage(); //makes sure theme setting is persistant after refresh
        }
        return(
        <nav className="NavBar-container u-flex">
            {/*<div className="NavBar-title u-inlineBlock">Gumdrops</div>*/} 
            <div className="NavBar-imageContainer u-inlineBlock">
                <img className="NavBar-mainImg" src={Logo}/>
            </div>
            <section className="NavBar-linkContainer">
                <Link to="/" className="NavBar-link">Home</Link>
                <Link to="/explore" className="NavBar-link">Explore</Link>
                {this.props.userId ? (
                    <>
                        <Link to = "/get-started" className = "NavBar-link">Get Started</Link>
                        <Link to={"/profile/"+this.props.userId} className="NavBar-link">Profile</Link>
                        <Link to="/projects" className="NavBar-link">My Projects</Link>
                        <Link to="/rewards" className="NavBar-link">Rewards</Link>
                        <Link to="/about-us" className="NavBar-link">About Us</Link>
                    </>
                ) : (<Link to="/about-us" className="NavBar-link">About Us</Link>)}
            </section>
            <section className="NavBar-loginContainer">
                {this.props.userId ? (
                    <GoogleLogout
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={this.props.handleLogout}
                        onFailure={(err) => console.log(err)}
                        className="u-link NavBar-login"
                        theme={this.props.modeValue}
                    />
                    ) : (
                    <GoogleLogin
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.props.handleLogin}
                        onFailure={(err) => console.log(err)}
                        className="u-link NavBar-login"
                        theme={this.props.modeValue}
                    />
                )}
            </section>
        </nav>);
    }
}
export default NavBar;