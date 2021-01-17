import React, { Component } from "react";

import "./JournalMessage.css";

/**
 * Renders a single chat message
 *
 * Proptypes
 * @param {MessageObject} message
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
    return (
      <div className={"u-flex u-flex-alignCenter JournalMessage-container"}>
        <span className="JournalMessage-sender u-bold">{this.props.message.sender.name}</span>
        <span className="JournalMessage-time">{readableTime}</span>
        <span className="JournalMessage-content">{this.props.message.content}</span>
      </div>
    );
  }
}

export default JournalMessage;
