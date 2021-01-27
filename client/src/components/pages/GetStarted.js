import React, { Component } from "react";
import "./Profile.css";
import "../../utilities.css";
import "./GetStarted.css";
import gumdrops_icon from "../../public/GumdropsIcon_Transparent.png";

/**
 * Get Started Page it tells everyone how to use the Gumdrops App
 * 
 * Proptypes 
 * no proptypes just render 
 * 
 * 
 */

 class GetStarted extends Component{
     constructor(props){
         super(props);
     }

     render(){
         return(
            <>
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