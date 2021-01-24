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
            <img className="Rewards-center" src={Img}/>
            <h4 className="u-textCenter">Web Lab Master</h4>
          </div>
        </div>
        <div className="Rewards-proUnlockContainer u-inlineBlock">
          <h1>Progress</h1>
          <div className="Rewards-progress">
            <img className="Rewards-center" src={Img}/>
            <h4 className="u-textCenter">20/100 Page Views</h4>
          </div>
        </div>
        <div className="Rewards-proUnlockContainer u-inlineBlock">
          <h1>Unlockables</h1>
          <div className="Rewards-unlockables">
            <img className="Rewards-center" src={Img}/>
            <h4 className="u-textCenter">Space Banner</h4>
          </div>
        </div>
      </>
    );
  }
}

export default Rewards;
