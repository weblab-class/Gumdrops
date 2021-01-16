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
    const dd = this.props.message.timestamp.substring(8, 10);
    const mm = this.props.message.timestamp.substring(5, 7);
    const yyyy = this.props.message.timestamp.substring(0, 4);
    const timeStamp = mm + "/" + dd + "/" + yyyy;

    return (
      <div className={"u-flex u-flex-alignCenter JournalMessage-container"}>
        <span className=" JournalMessage-sender u-bold">{this.props.message.sender.name + ":"}</span>
        <span className="JournalMessage-content">{"(" + timeStamp + ")  " + this.props.message.content}</span>
      </div>
    );
  }
}

export default JournalMessage;
