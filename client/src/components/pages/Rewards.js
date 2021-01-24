import React, { Component } from "react";
import "./Rewards.css"
import "../../utilities.css";
import Img from "../../public/ximage.png";

class Rewards extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return ( //hard coded for now
      <>
        <div className="Rewards-achievementsContainer">
          <h1>Achievements</h1>
          <div className="Rewards-achievement">
            <img className="Rewards-centerImg" src={Img}/>
            <h3 className="u-textCenter">Web Lab Master</h3>
            <h4 className="u-textCenter">20/100 Page Views</h4>
          </div>
        </div>
        <div className="Rewards-unlockContainer u-inlineBlock">
          <h1>Unlockables</h1>
          <div className="Rewards-unlockables">
            <img className="Rewards-centerImg" src={Img}/>
            <h3 className="u-textCenter">Space Banner</h3>
            <h4 className="u-textCenter">5/10 Projects</h4>
          </div>
        </div>
      </>
    );
  }
}

export default Rewards;
