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
    return (
      <div className={"u-flex u-flex-alignCenter JournalMessage-container"}>
        <span className=" JournalMessage-sender u-bold">{this.props.message.sender.name + ":"}</span>
        <span className="JournalMessage-content">{this.props.message.content}</span>
      </div>
    );
  }
}

export default JournalMessage;
