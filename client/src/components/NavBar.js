import React, { Component } from "react";
import {Link} from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./NavBar.css";
import Logo from "../public/GumdropsIcon_Transparent.png";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "645405290237-qdttkk69k3hubem22c5bm8cf356qr2vg.apps.googleusercontent.com";

//Props
//userId: String

class NavBar extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        console.log(this.props.userId);
        
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
                        <Link to={"/profile/"+this.props.userId} className="NavBar-link">Profile</Link>
                        <Link to="/projects" className="NavBar-link">My Projects</Link>
                        <Link to="/rewards" className="NavBar-link">Rewards</Link>
                    </>
                ) : (<span></span>)}
            </section>
            <section className="NavBar-loginContainer">
                {this.props.userId ? (
                    <GoogleLogout
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={this.props.handleLogout}
                        onFailure={(err) => console.log(err)}
                        className="u-link NavBar-login"
                    />
                    ) : (
                    <GoogleLogin
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.props.handleLogin}
                        onFailure={(err) => console.log(err)}
                        className="u-link NavBar-login"
                    />
                )}
            </section>
        </nav>);
    }
}
export default NavBar;