import React, { Component } from "react";
import { get } from "../../utilities.js";
import "./Rewards.css"
import "../../utilities.css";
import Img from "../../public/ximage.png";

//Props
//userId: String
class Rewards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      achievements: [
        {
          imageSource: Img,
          title: "Baby Gummy",
          type: "projects" // #/1 Projects
        },
        {
          imageSource: Img,
          title: "Social Butterfly",
          type: "journal" // #/5 Journal Entries
        },
        {
          imageSource: Img,
          title: "Web Lab Master",
          type: "views" // #/25 Page Views
        },
      ],
      unlockables: [
        {
          imageSource: Img,
          title: "Space Banner",
          type: "projects" // #/10 Projects
        },
        {
          imageSource: Img,
          title: "Color Theme",
          type: "storycard" // #/10 Story Cards
        },
        {
          imageSource: Img,
          title: "Role @Dragonator",
          type: "tags" // #/10 People Tagged
        },
      ],
      data: undefined,
    };
  }

  componentDidMount() {
    if(this.props.userId){
      get("/api/reward", {userId: this.props.userId}).then((data)=>{
        for (const [key, val] of Object.entries(data)) {
          console.log(`${key}: ${val}`)
        }
        this.setState({
          data: data,
        });
      });
    }
  }

  calculateProgress= (title, type) => {
    const progress = this.state.data[type];
    if(type==="journal"){
      if(progress >= 5){
        return "Complete!";
      } else return`${progress}/5 Journal Entries`;
    }
    if(type==="storycard"){
      if(progress >= 10){
        return "Complete!";
      } else return`${progress}/10 Story Cards`;
    }
    if(type==="tags"){
      if(progress >= 10){
        return "Complete!";
      } else return`${progress}/10 People Tagged`;
    }
    if(type==="views"){
      if(progress >= 25){
        return "Complete!";
      } else return`${progress}/25 Page Views`;
    }
    if(type==="projects"){ //Seperte by title "Baby Gummy" vs "Space Banner"
      if(title==="Baby Gummy"){
        if(progress >= 1){
          return "Complete!";
        } else return`${progress}/1 Project`;
      }
      if(title==="Space Banner"){
        if(progress >= 10){
          return "Complete!";
        } else return`${progress}/10 Projects`;
      }
    }
  }

  render() {
    if(this.props.userId){
      if(this.state.data){
        return (
          <>
            <div>
              <h1 className="Rewards-title">Achievements</h1>
                {this.state.achievements.map((reward, i)=>(
                  <div className="Rewards-achievement u-inlineBlock" key={i}>
                    <img className="Rewards-centerImg" src={reward.imageSource}/>
                    <h3 className="u-textCenter">{reward.title}</h3>
                    <h4 className="u-textCenter">{this.calculateProgress(reward.title, reward.type)}</h4>
                  </div>
                ))}
            </div>
            <div>
              <h1 className="Rewards-title">Unlockables</h1>
                {this.state.unlockables.map((reward, i)=>(
                  <div className="Rewards-unlockables u-inlineBlock" key={i}>
                    <img className="Rewards-centerImg" src={reward.imageSource}/>
                    <h3 className="u-textCenter">{reward.title}</h3>
                    <h4 className="u-textCenter">{this.calculateProgress(reward.title, reward.type)}</h4>
                  </div>
                ))}
            </div>
          </>
        );
      }
      return <h1>Loading!</h1>
    }
    return <h1>Sign In!</h1>;
  }
}

export default Rewards;
