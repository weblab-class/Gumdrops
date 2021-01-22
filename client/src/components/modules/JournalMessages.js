import React, { Component } from "react";
import JournalMessage from "./JournalMessage.js";
import { NewJournalMessage } from "./NewPostInput.js";
import "./JournalMessages.css";

/**
 * Renders main chat window including previous messages,
 * who is being chatted with, and the new message input.
 *
 * Proptypes
 * @param {ChatData} data
 * @param {Boolean} canSend
 * @param {Object} userRoles (where key is userName and value is an Array of [userName,userId,roleStyle])
 * @param {String} userId
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
      renderOutput.push(<div key={lastTimeStamp}><hr/><h2 className="JournalMessage-date">{lastTimeStamp}</h2><hr/></div>); //header for first date
    }
    for(var i=0; i<this.props.data.messages.length;i++){
      let currTimeStamp = this.convert(this.props.data.messages[i].timestamp.substr(0,10));
      if (currTimeStamp!==lastTimeStamp){
        renderOutput.push(<div key={currTimeStamp}><hr/><h2 className="JournalMessage-date">{currTimeStamp}</h2><hr/></div>);
        lastTimeStamp = currTimeStamp;
      }
      renderOutput.push(
        <JournalMessage 
          message={this.props.data.messages[i]} 
          userRoles={this.props.userRoles}
          userId={this.props.userId}
          key={"JournalMessage_"+this.props.data.messages[i].timestamp}
        />
      );
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
