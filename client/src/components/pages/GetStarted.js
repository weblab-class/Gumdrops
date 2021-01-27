import React, { Component } from "react";
import { get, post } from "../../utilities";
import "./Profile.css";
import "../../utilities.css";
import "./GetStarted.css";
import gumdrops_icon from "../../public/GumdropsIcon_Transparent.png";
import project_page from "../../public/ProjectPage.png";
import create_project from "../../public/CreateProject.png";
import rewards from "../../public/Rewards.png";
import explore from "../../public/Explore.png";

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
        if(this.props.userId){
            console.log(this.props.userId)
            get(`/api/user`, { userid: this.props.userId }).then((user) => {
                if(this._isMounted){
                    this.setState({
                        user: user 
                    });
                };
            });
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

     render(){
         return(
            <>
                <h2 className="u-textCenter Profile-welcome">Welcome, {!this.state.user ? "Anonymous" : this.state.user.name}</h2>
                <hr></hr>
               <h1 className="u-textCenter getStarted-title">Get Started with using<img style={{"verticalAlign":"-3vh","height":"9vh"}} src={gumdrops_icon}></img></h1>
               <div className="getStarted-instruct-container">
                   <div className="getStarted-step-container">
                       <section className="getStarted-leftStep-container">
                           <article className="getStarted-leftStep-text">
                            <h2 className="getStarted-textTitle">1. Create your first project</h2>
                            <p className="getStarted-subText">Head to the "My Projects" tab in your navbar and click on the gray button with a plus sign to create your first project!</p>
                            <p className="getStarted-subText">Make sure to fill out your project name, add any collaborators that you are working with (don't include yourself), and assign all your group members a role.</p>
                           </article>
                       </section>
                       <section className="getStarted-rightStep-container">
                           <img src={create_project} className="getStarted-img"/>
                       </section>
                   </div>
               </div>
               <div className="getStarted-instruct-container">
                   <div className="getStarted-step-container">
                       <section className="getStarted-leftStep-container">
                           <article className="getStarted-leftStep-text">
                               <h2 className="getStarted-textTitle">2. Populate your project with content</h2>
                               <p className="getStarted-subText">Your project consists of two main components, the story cards and journal. Story cards are where you can save your images, project descriptions, and links to your project folder and documents.</p>
                               <p className="getStarted-subText">The journal is where you and your teammates can keep logs of updates and progress. Think of it as a daily diary where you can look back on what happened on a particular day (Note: The message timestamps are in EST)</p>
                           </article>
                       </section>
                       <section className="getStarted-rightStep-container">
                           <img src={project_page} className="getStarted-img"/>
                       </section>
                   </div>
               </div>
               <div className="getStarted-instruct-container">
                   <div className="getStarted-step-container">
                       <section className="getStarted-leftStep-container">
                            <article className="getStarted-leftStep-text">
                                <h2 className="getStarted-textTitle">3. Earn rewards</h2>
                                <p className="getStarted-subText">As you work on your projects, you can earn rewards for having story cards, journal tags, and more! Tagging is where you mention your team member names in the journal (e.g, "@Huy_Dai worked on the kalimba today"). You can even tag yourself!</p>
                            </article>
                       </section>
                       <section className="getStarted-rightStep-container">
                            <img src={rewards} className="getStarted-img"/>
                       </section>
                   </div>
               </div>
               <div className="getStarted-instruct-container">
                   <div className="getStarted-step-container">
                       <section className="getStarted-leftStep-container">
                            <article className="getStarted-leftStep-text">
                                <h2 className="getStarted-textTitle">4. Explore other Gumdrops projects!</h2>
                                <p className="getStarted-subText">Gumdrops was created with the intention of creating a community of creative-learners. The Explore page is a great way to take a look at projects created by other members of the community.</p>
                                <p className="getStarted-subText">Currently, all projects made on the website are publicly viewable. In the future, we plan to add an option for users to choose whether to show or hide their project in the Explore page</p>
                            </article>
                      </section>
                       <section className="getStarted-rightStep-container">
                            <img src={explore} className="getStarted-img"/>
                       </section>
                   </div>
               </div>

            </>
         )
     }
 }
 export default GetStarted;