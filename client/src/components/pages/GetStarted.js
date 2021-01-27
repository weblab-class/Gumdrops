import React, { Component } from "react";
import "./Profile.css";
import "../../utilities.css";

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
             
             <h1 className="u-textCenter">Get Started with using Gumdrops</h1>

         )
     }
 }
 export default GetStarted;