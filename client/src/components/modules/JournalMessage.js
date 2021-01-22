import React, { Component } from "react";

import "./JournalMessage.css";

/**
 * Renders a single chat message
 *
 * Proptypes
 * @param {MessageObject} message
 * @param {Object} userRoles (where key is userName and value is an Array of [userName,userId,roleStyle])
 */ 
class JournalMessage extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    //Date stamps longer being used - Harry
    /*
    const dd = this.props.message.timestamp.substring(8, 10);
    const mm = this.props.message.timestamp.substring(5, 7);
    const yyyy = this.props.message.timestamp.substring(0, 4);
    const timeStamp = mm + "/" + dd + "/" + yyyy;
    */
    const hh = parseInt(this.props.message.timestamp.substring(11, 13));
    const mm = this.props.message.timestamp.substring(14, 16);
    let isAM = true;

    let readableTime = "";
    if(hh<12){
      if(hh===0){
        readableTime = "12:";
      } else {
        readableTime = ""+hh+":";
      }
    } else {
      readableTime = ""+(hh-12)+":";
      isAM = false;
    }
    readableTime += mm;
    if(isAM){
      readableTime += " AM";
    } else {
      readableTime += " PM";
    }

    let outputArray;
    if(this.props.message.content && this.props.userRoles) {
      let text = this.props.message.content;
      outputArray = [];
      while(text!=="") {
        let nextAt = text.indexOf("@");
        if(nextAt === -1) {
            outputArray.push(text);
            break;
        } else {
          if(nextAt !== 0){ 
            outputArray.push(text.substring(0,nextAt));
          }
          text = text.substring(nextAt);
          let userFound = false;
          for (const [key, value] of Object.entries(this.props.userRoles)) {
            if(text.startsWith(key)){
              // console.log("I found username "+key);
              outputArray.push(key);
              text = text.substring(key.length);
              userFound = true;
              break;
            }
          }
          if(!userFound) { //did not find anything
            outputArray.push("@");
            text = text.substring(1);
          }
        }
        }
    } else {
      outputArray = this.props.message.content;
    }
    return (
      <div className={"u-flex u-flex-alignCenter JournalMessage-container"}>
        <span className="JournalMessage-sender u-bold">{this.props.message.sender.name}</span>
        <span className="JournalMessage-time">{readableTime}</span>
        <span className="JournalMessage-content">
          {
            this.props.userRoles ?
            outputArray.map((value, i)=>{
              if(value in this.props.userRoles){
                  return <span>
                            <a style={this.props.userRoles[value][2]} href={"/profile/"+this.props.userRoles[value][1]}>{value}</a>
                        </span>;
                  return <a style={this.props.userRoles[value][2]} key={i} href={"/profile/"+this.props.userRoles[value][1]}>{value}</a>;
              } else {
                  return <span key={i}>{value}</span>;
              }
            })
            : this.props.message.content
          }</span>
      </div>
    );
  }
}

export default JournalMessage;
