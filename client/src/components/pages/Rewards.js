import React, { Component } from "react";
import { get } from "../../utilities.js";
import "./Rewards.css"
import "../../utilities.css";
import Img from "../../public/question_mark.png";
import BabyGummy from "../../public/LilDrop.png";
import SocialButterfly from "../../public/Butterfly.jpg";
import WebLabMaster from "../../public/WebLab.png";
import SpaceBanner from "../../public/space.png";
import ColorTheme from "../../public/colors.png";
import Role from "../../public/cute_penguin.png";


//Props
//userId: String
class Rewards extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      achievements: [
        {
          imageSource: Img,
          title: "Baby Gummy",
          type: "projects", // #/1 Projects
          progress: undefined
        },
        {
          imageSource: Img,
          title: "Social Butterfly",
          type: "journal", // #/5 Journal Entries
          progress: undefined
        },
        {
          imageSource: Img,
          title: "Web Lab Master",
          type: "views", // #/25 Page Views
          progress: undefined
        },
      ],
      unlockables: [
        {
          imageSource: Img,
          title: "Space Banner",
          type: "projects", // #/10 Projects
          progress: undefined
        },
        {
          imageSource: Img,
          title: "Color Theme",
          type: "storycard", // #/10 Story Cards
          progress: undefined
        },
        {
          imageSource: Img,
          title: "Role @Penguin_Overlord",
          type: "tag", // #/10 People Tagged
          progress: undefined
        },
      ],
      data: undefined,
      images: {
        Default: Img,
        projects1: BabyGummy,
        journal: SocialButterfly,
        views: WebLabMaster,
        projects2: SpaceBanner,
        storycard: ColorTheme,
        tag: Role
      }
    };
  }

  componentDidMount() {
    this._isMounted = true;

    if(this.props.userId){
      get("/api/reward", {userId: this.props.userId}).then((data)=>{
        let progress = 0;
        get("/api/projects", {userid: this.props.userId}).then((dataObj)=>{
          dataObj.projects.forEach((projectObj)=>{
            if(projectObj.numJournalTags){
              progress += projectObj.numJournalTags;
            }
          });
          let newData = {...data};
          newData.tag = progress;
          console.log(newData)
          if(this._isMounted){
            this.setState({
              data: newData,
            });
            console.log(this.state.data);
            this.handleInit();
          }
        });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate() {
    if(!this.state.data){
      if(this.props.userId){
        get("/api/reward", {userId: this.props.userId}).then((data)=>{
          let progress = 0;
          get("/api/projects", {userid: this.props.userId}).then((dataObj)=>{
            dataObj.projects.forEach((projectObj)=>{
              if(projectObj.numJournalTags){
                progress += projectObj.numJournalTags;
              }
            });
            let newData = {...data};
            newData.tag = progress;
            console.log(newData)
            if(this._isMounted){
              this.setState({
                data: newData,
              });
              console.log(this.state.data);
              this.handleInit();
            }
          });
        });
      }
    }
  }

  handleInit = () => {
    let updatedAchievements = [...this.state.achievements];
    let updatedUnlockables =  [...this.state.unlockables];
    this.state.achievements.forEach((reward, i)=>{
      let achievement = {...reward};
      achievement.progress = this.calculateProgress(reward.title, reward.type);
      updatedAchievements[i] = achievement;
    });
    this.state.unlockables.forEach((reward, i)=>{
      let unlockable = {...reward};
      unlockable.progress = this.calculateProgress(reward.title, reward.type);
      updatedUnlockables[i] = unlockable;
    });
    updatedAchievements.forEach((reward, i)=>{
      let achievement = {...reward};
      if(achievement.progress==="Complete!"){
        if(reward.title==="Baby Gummy"){
          achievement.imageSource = this.state.images.projects1;
        } else{
          achievement.imageSource = this.state.images[reward.type];
        }
      } else{
        achievement.title = "Locked!";
      }
      updatedAchievements[i] = achievement;
    });
    updatedUnlockables.forEach((reward, i)=>{
      let unlockable = {...reward};
      if(unlockable.progress==="Complete!"){
        if(reward.title==="Space Banner"){
          unlockable.imageSource = this.state.images.projects2;
        } else{
          unlockable.imageSource = this.state.images[reward.type];
        }
      } else{
        unlockable.title = "Locked!";
      }
      updatedUnlockables[i] = unlockable;
    });
    this.setState({
      achievements: updatedAchievements,
      unlockables: updatedUnlockables
    });
  }

  calculateProgress = (title, type) => {
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
    if(type==="views"){
      if(progress >= 25){
        return "Complete!";
      } else return`${progress}/25 Page Views`;
    }
    if(type==="tag"){
      if(progress >= 5){
        return "Complete!";
      } else return`${progress}/5 People Tagged`;
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
    console.log("progress for tag: "+this.state.unlockables[2].progress);
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
                    <h4 className="u-textCenter">{reward.progress}</h4>
                  </div>
                ))}
            </div>
            <div>
              <h1 className="Rewards-title">Unlockables</h1>
                {this.state.unlockables.map(function(reward, i){ // ,i might cause problems (if it does, replace key with reward.title instead)
                  if(reward.progress==="Complete!"){ //This is where you change the render of unlockables that are unlocked
                    return (
                      <div className="Rewards-unlockables u-inlineBlock" key={i}>
                        <img className="Rewards-centerImg" src={reward.imageSource}/>
                        <h3 className="u-textCenter">{reward.title}</h3>
                        <h4 className="u-textCenter">{reward.progress}</h4>
                      </div>
                    );
                  } else{
                    return (
                      <div className="Rewards-unlockables u-inlineBlock" key={i}>
                        <img className="Rewards-centerImg" src={reward.imageSource}/>
                        <h3 className="u-textCenter">{reward.title}</h3>
                        <h4 className="u-textCenter">{reward.progress}</h4>
                      </div>
                    );
                  }
                })}
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
