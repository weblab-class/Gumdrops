import React, { Component } from "react";
import { Router } from "@reach/router";
import { socket } from "../client-socket.js";
import { get, post, applyThemeFromLocalStorage, loadDefaultTheme } from "../utilities.js";
import NavBar from "./NavBar.js";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile.js";
import Projects from "./pages/Projects.js";
import Explore from "./pages/Explore.js";
import SingleProject from "./pages/SingleProject.js";
import CreateProject from "./pages/CreateProject.js";
import Rewards from "./pages/Rewards.js";
import Cursor from "./modules/Cursor.js";
import "../utilities.css";
import "./pages/Skeleton.css";
import ThemeManager from "./modules/ThemeManager.js";
import user from "../../../server/models/user.js";
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

  //Retrieves user theme, and if exists, apply it
  loadUserTheme = (userId) => {
    get("/api/theme",{ userId: userId}).then((themeObj)=>{
      //load theme, if it exists
      console.log(themeObj);
      if(themeObj!=={}) {
          localStorage.setItem("currTheme", JSON.stringify(themeObj));
          applyThemeFromLocalStorage();
      }
    });
  }

  //intialized rewards if this the first time login
  //it could also be used to retrieve not yet 
  loadReward = (userId)=>{
    post("/api/initreward",{userId: userId}).then((value)=>{
    console.log("initialized reward")
    console.log(value)
  })
  }

  //Attempts to save user theme settings from LocalStorage, if it exists
  saveUserTheme = async (userId) => {
    try{
      if(localStorage.hasOwnProperty("currTheme")){
        let currTheme = localStorage.getItem("currTheme");
        let postBody = { userId: userId, themeData: JSON.parse(currTheme)};
        let result = await post("/api/theme",postBody);
        return result;
      }
    } catch(e) {
      console.log(e);
    }
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
      this.loadUserTheme(user._id);
    });
    localStorage.setItem("loggedin","true");
    applyThemeFromLocalStorage(); //run to make sure we apply theme early-on.
  };

  handleLogout = () => {
    this.saveUserTheme(this.state.userId).then((result)=>{
      localStorage.setItem("loggedin","false");
      loadDefaultTheme();
      applyThemeFromLocalStorage();
      this.setState({ userId: undefined });
      post("/api/logout").then(()=> window.location.replace("/"));
  });
    
  };

  render() {
    return (
      <>
        <NavBar userId={this.state.userId} 
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
        />
        <ThemeManager userId={this.state.userId}/>
        {/*<Cursor />*/}
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
