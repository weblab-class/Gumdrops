import React, { Component } from "react";
import JournalMessage from "./JournalMessage.js";
import { /*DeleteJournalMessage,*/ NewJournalMessage } from "./NewPostInput.js";
import "./JournalMessages.css";

/**
 * @typedef UserObject
 * @property {string} _id
 * @property {string} name
 */
/**
 * @typedef MessageObject
 * @property {UserObject} sender
 * @property {string} content
 */
/**
 * @typedef ChatData
 * @property {MessageObject[]} messages
 * @property {UserObject} recipient
 */

/**
 * Renders main chat window including previous messages,
 * who is being chatted with, and the new message input.
 *
 * Proptypes
 * @param {ChatData} data
 * @param {Boolean} canSend
 */
class JournalMessages extends Component {
  constructor(props) {
    super(props);
  }

  convert = (timeStamp) => {
    const mm = timeStamp.substr(5,2);
    const dd = timeStamp.substr(8,2);
    const yyyy = timeStamp.substr(0,4);
    return `${mm}/${dd}/${yyyy}`;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if(this.messagesEnd){
      this.messagesEnd.scrollIntoView({behavior:"smooth"});
    }
  }

  render() {
    let renderOutput = [];
    let lastTimeStamp;
    if(this.props.data.messages[0]){ 
      lastTimeStamp = this.convert(this.props.data.messages[0].timestamp.substr(0,10));
      renderOutput.push(<><hr/><h2 className="JournalMessage-date">{lastTimeStamp}</h2><hr/></>); //header for first date
    }
    for(var i=0; i<this.props.data.messages.length;i++){
      let currTimeStamp = this.convert(this.props.data.messages[i].timestamp.substr(0,10));
      if (currTimeStamp!==lastTimeStamp){
        renderOutput.push(<><hr/><h2 className="JournalMessage-date">{currTimeStamp}</h2><hr/></>);
        lastTimeStamp = currTimeStamp;
      }
      renderOutput.push(
      <JournalMessage message={this.props.data.messages[i]} 
        key={"JournalMessage_"+this.props.data.messages[i].timestamp}/>);
    }
    if(this.props.canSend){
      return (
        <>
          <div className="u-flexColumn JournalMessages-container">
            <h3 className="u-textCenter">Team Journal</h3>
            <div className="JournalMessages-historyContainer">
              {renderOutput}
              <div 
                style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}
              />
            </div>
          </div>
          <div className="JournalMessages-newContainer">
            <NewJournalMessage recipient={this.props.data.recipient} />
            {/* <DeleteJournalMessage sender={this.props.senderId}/> */}
          </div>
      </>
      );
    }
    return (
      <div className="u-flexColumn JournalMessages-containerCantSend">
        <h3 className="u-textCenter">Team Journal</h3>
        <div className="JournalMessages-historyContainer">
          {renderOutput}
          <div 
                style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}
              />
        </div>
      </div>
    );
  }
}

export default JournalMessages;
