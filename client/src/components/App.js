import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import NavBar from "./NavBar.js";
import Profile from "./pages/Profile.js";
import "../utilities.css";
import Projects from "./pages/Projects.js";
import Explore from "./pages/Explore.js";
import Journal from "./modules/Journal.js";
import StoryCard from "./modules/StoryCard.js";
//import SingleProject from "./pages/SingleProject.js";
import { socket } from "../client-socket.js";
import { get, post } from "../utilities";
import SingleProject from "./pages/SingleProject.js";
/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout").then(()=> window.location.replace("/"));

  };

  render() {
    return (
      <>
        <NavBar userId={this.state.userId} 
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
        />
        <Router>
          <Skeleton
            path="/"
            userId={this.state.userId}
          />
          <Profile path="/profile/:userId"/>
          <Explore path="/explore"/>
          <Projects path="/projects"/>
          <SingelProject path="/project/:projectId" userId={this.state.userId}/>
          <Journal path="/journal/" userId={this.state.userId} />
          <StoryCard path ="/test1" />
          {/* <SingleProject path = "/singleproject/" userID={this.state.userID}/> */}
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
