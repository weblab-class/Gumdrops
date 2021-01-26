import React, { Component } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 * @param {String} size is optional prop, used to make input inline
 */
class NewPostInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  // called whenever the user types in the new post input box
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    if(this.props.size){
      return (
        <span className="u-flex" style={{width: this.props.size, margin: "0"}}>
          <input
            type="text"
            placeholder={this.props.defaultText}
            value={this.state.value}
            onChange={this.handleChange}
            className="NewPostInput-input"
          />
          <button
            type="submit"
            className="NewPostInput-button u-pointer"
            value="Submit"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </span>
      );
    } else{
      return (
        <div className="u-flex">
          <input
            type="text"
            placeholder={this.props.defaultText}
            value={this.state.value}
            onChange={this.handleChange}
            className="NewPostInput-input"
          />
          <button
            type="submit"
            className="NewPostInput-button u-pointer"
            value="Submit"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      );
    }
  }
}

/**
 *
 * Proptypes
 * updateMessage
 * recipient
 */
class NewJournalMessage extends Component {
  sendMessage = (value) => {
    const body = { recipient: this.props.recipient, content: value }
    post("/api/message", body);
    this.props.updateMessage && this.props.updateMessage(1);
  };
  
  render() {
    return <NewPostInput defaultText="New Message" onSubmit={this.sendMessage} size={this.props.size}/>;
  }
}

// Proptypes
// userId : String
class NewBio extends Component {
  sendMessage = (value) => {
    const body = { userId: this.props.userId, content: value }
    post("/api/profile-bio", body);
  };

  render() {
    return <NewPostInput defaultText="New Bio" onSubmit={this.sendMessage} />;
  }
}

export { NewPostInput, /*NewComment, NewStory,*/ NewJournalMessage, NewBio};
