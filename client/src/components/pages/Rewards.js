import React, { Component } from "react";
import "./Rewards.css"
import "../../utilities.css";
import Img from "../../public/ximage.png";

class Rewards extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      achievements: [
        {
          imageSource: Img,
          title: "Baby Gummy",
          progress: "Complete"
        },
        {
          imageSource: Img,
          title: "Social Butterfly",
          progress: "3/5 Journal Entries"
        },
        {
          imageSource: Img,
          title: "Web Lab Master",
          progress: "20/100 Page Views"
        },
      ],
      unlockables: [
        {
          imageSource: Img,
          title: "Space Banner",
          progress: "5/10 Projects"
        },
        {
          imageSource: Img,
          title: "Color Theme",
          progress: "0/1 Story Cards"
        },
        {
          imageSource: Img,
          title: "Role @Dragonator",
          progress: "4/10 People Tagged"
        },
      ]
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        <div /*className="Rewards-achievementsContainer"*/>
          <h1 className="Rewards-title">Achievements</h1>
            {this.state.achievements.map((reward)=>(
              <div className="Rewards-achievement u-inlineBlock">
                <img className="Rewards-centerImg" src={reward.imageSource}/>
                <h3 className="u-textCenter">{reward.title}</h3>
                <h4 className="u-textCenter">{reward.progress}</h4>
              </div>
            ))}
        </div>
        <div /*className="Rewards-unlockContainer u-inlineBlock"*/>
          <h1 className="Rewards-title">Unlockables</h1>
            {this.state.unlockables.map((reward)=>(
              <div className="Rewards-unlockables u-inlineBlock">
                <img className="Rewards-centerImg" src={reward.imageSource}/>
                <h3 className="u-textCenter">{reward.title}</h3>
                <h4 className="u-textCenter">{reward.progress}</h4>
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default Rewards;
