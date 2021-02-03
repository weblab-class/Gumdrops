import React, { Component } from "react";
import "../../utilities.css";
import "./AboutUs.css";

/**
 * About Us Page tells everyone about Gudrops
 * 
 * Proptypes 
 * none
 */

 class AboutUs extends Component{
     constructor(props){
         super(props);
     }

     render(){
         return(
            <>
                <h1 className="AboutUs-title">About Us!</h1>
                <h4 className="AboutUs-text">Gumdrops started as a passion project by a number of first-year MIT students that was 
                    eventually sponsored as an ELO (Experiential Learning Opportunity) by the MIT Edgerton Center under Ed Moriarity. The initial plan for Gumdrops was to develop a crowdsourcing platform for students, by students, to share games, simulations, and videos about educational topics that they are interested in. 
                </h4>
                <h4 className="AboutUs-text">Over time, as the group grew and expanded, Gumdrops saw multiple revisions of its focus, shifting to a virtual classroom/ social media hybrid where teachers can post verified educational content and students could share images and videos of their project. Finally, we settled on creating a platform for teams to document and share their project experience through the method of storytelling that highlights the human aspect of every project. This website represents the first prototype of Gumdrops. In the future, we hope to continue to evolve and develop this website into one that would allow for more people to connect and collaborate in building a bigger, more tight-knit Gumdrops community.</h4>
            </>
         )
     }
 }
 export default AboutUs;