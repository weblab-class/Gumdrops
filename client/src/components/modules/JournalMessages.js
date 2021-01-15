import React, { Component } from "react";
import JournalMessage from "./JournalMessage.js";
import { NewJournalMessage } from "./NewPostInput.js";

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
 */
class JournalMessages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="u-flexColumn JournalMessages-container">
        <h3 className="u-textCenter">Team Journal</h3>
        <div className="JournalMessages-historyContainer">
          {this.props.data.messages.map((m, i) => (
            <JournalMessage message={m} key={i} />
          ))}
        </div>
        <div className="JournalMessages-newContainer">
          <NewJournalMessage recipient={this.props.data.recipient} />
        </div>
      </div>
    );
  }
}

export default JournalMessages;
