import React, { Component } from "react";
import { get, post } from "../../utilities";
import "./JournalMessage.css";

/**
 * Renders a single chat message
 *
 * Proptypes
 * @param {MessageObject} message
 * @param {Object} userRoles (where key is userName and value is an Array of [userName,userId,roleStyle])
 * @param {String} userId
 */ 
class JournalMessage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      button: false,
    };
  }

  displayButton = (event) => {
    event.preventDefault();
    if(this._isMounted && (this.props.userId===this.props.message.sender._id)) {
      this.setState({
        button: true,
      });
    };
  }

  hideButton = (event) => {
    event.preventDefault();
    if(this.state.button && this._isMounted && (this.props.userId===this.props.message.sender._id)) {
      this.setState({
        button: false,
      });
    };
  }

  clickedDelete = (event) => {
    event.preventDefault();
    // console.log("Calling api to delete message: "+this.props.message.content);
    const body = { message: this.props.message, recipient_id: this.props.message.recipient._id };
    post("/api/deleteMessage", body).then("Deleted "+this.props.message.content);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
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

    let button = <></>;
    if(this.state.button){
      button = (
        <button 
          type = "submit"
          className = "JournalMessage-delete u-pointer"
          value = "Submit"
          onClick={this.clickedDelete}
        >Delete
        </button>
      );
    }

    return (
      <div 
        onMouseOver={this.displayButton}
        onMouseLeave={this.hideButton} 
        className={"u-flex u-flex-alignCenter JournalMessage-container"}
      >
        <span className="JournalMessage-sender u-bold">{this.props.message.sender.name}</span>
        <span className="JournalMessage-time">{readableTime}</span>
        <span className="JournalMessage-content">
          {
            this.props.userRoles ?
            outputArray.map((value, i)=>{
              if(value in this.props.userRoles){
                  return (
                    <span key={i}>
                      <a 
                        style={this.props.userRoles[value][2]} 
                        href={"/profile/"+this.props.userRoles[value][1]}>{value}
                      </a>
                    </span>
                  );
              } else {
                  return <span key={i}>{value}</span>;
              }
            })
            : this.props.message.content
          }
          {button}
        </span>
      </div>
    );
  }
}

export default JournalMessage;
