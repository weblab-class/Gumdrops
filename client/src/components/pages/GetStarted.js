import React, { Component } from "react";
import { get, post } from "../../utilities";
import "./Profile.css";
import "../../utilities.css";
import "./GetStarted.css";
import gumdrops_icon from "../../public/GumdropsIcon_Transparent.png";

/**
 * Get Started Page it tells everyone how to use the Gumdrops App
 * 
 * Proptypes 
 * userId: String
 */

 class GetStarted extends Component{
    _isMounted = false;

     constructor(props){
         super(props);

         this.state = {
            user: undefined,
         }
     }

    componentDidMount() {
        this._isMounted = true;
        get(`/api/user`, { userid: this.props.userId }).then((user) => {
            if(this._isMounted){
                this.setState({
                    user: user 
                });
            };
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

     render(){
         return(
            <>
                <h2 className="u-textCenter Profile-welcome">Welcome, {!this.state.user ? "Anonymous" : this.state.user.name}</h2>
                <hr></hr>
               <h1 className="u-textCenter getStarted-title">Get Started with using<img style={{"verticalAlign":"middle"}} src={gumdrops_icon}></img></h1>
               <div className="getStarted-instruct-container">
                   <div className="getStarted-step-container">
                       <section className="getStarted-leftStep-container">
                           <h2>1. This is the instruction for the step</h2>
                       </section>
                       <section className="getStarted-rightStep-container">
                           <p>This should be where an image resisdes</p>
                       </section>
                   </div>
               </div>
               <div className="getStarted-instruct-container">
                   <div className="getStarted-step-container">
                       <section className="getStarted-leftStep-container">
                           <h2>1. This is the instruction for the step</h2>
                       </section>
                       <section className="getStarted-rightStep-container">
                           <p>This should be where an image resisdes</p>
                       </section>
                   </div>
               </div>
            </>
         )
     }
 }
 export default GetStarted;