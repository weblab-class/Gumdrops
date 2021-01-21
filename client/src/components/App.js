import React, { Component } from "react";
import { Router } from "@reach/router";
import { socket } from "../client-socket.js";
import { get, post } from "../utilities";
import NavBar from "./NavBar.js";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile.js";
import Projects from "./pages/Projects.js";
import Explore from "./pages/Explore.js";
import SingleProject from "./pages/SingleProject.js";
import CreateProject from "./pages/CreateProject.js";
import Rewards from "./pages/Rewards.js";
import "../utilities.css";
import "./pages/Skeleton.css";
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
          <Profile path="/profile/:userId" viewerId={this.state.userId}/>
          <Explore path="/explore" userId={this.state.userId}/>
          <Projects path="/projects" userId={this.state.userId}/>
          <SingleProject path="/project/:projectId" userId={this.state.userId}/>
          <CreateProject path="/createproject" userId={this.state.userId}/>
          <Rewards path="/rewards" userId={this.state.userId}/>
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
