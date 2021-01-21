import React, { Component } from "react";
// import JournalChats from "./JournalChats.js";
import JournalMessages from "./JournalMessages.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Journal.css";

const ALL_CHAT = {
    _id: "ALL_CHAT",
    name: "ALL CHAT",
};

// Props
// userId: String (id of current logged in user)
// projectId: String (id of the project it corresponds to)
// canSend: Boolean (dictates whether user can send messages in the journal)
class Journal extends Component {
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

    constructor(props) {
        super(props);
        const mainJournal = {
            _id: this.props.projectId,
            name: "MainJournal",
        };
        this.state = {
            activeUsers: [],
            activeChat: {
                recipient: mainJournal, //for compatibility with existing database entries
                messages: [],
            },
        };
    }

    loadMessageHistory(recipient) {
        console.log("Looking for chat with id "+recipient._id)
        get("/api/chat", { "recipient._id": recipient._id }).then((messages) => {
            this.setState({
                activeChat: {
                    recipient: recipient,
                    messages: messages,
                },
            });
        });
    }

    componentDidMount() {
        this.loadMessageHistory(this.state.activeChat.recipient);
        console.log("In Journal.js, my current projectId is "+this.state.activeChat.recipient._id);

        get("/api/activeUsers").then((data) => {
            // If user is logged in, we load their chats. If they are not logged in,
            // there's nothing to load. (Also prevents data races with socket event)
            if(this.props.userId) {
                this.setState({
                    activeUsers: [ALL_CHAT].concat(data.activeUsers),
                });
            };
        })

        socket.on("message", (data) => {
            console.log("Received update notice");
            this.setState((prevstate) => ({
                activeChat: {
                    recipient: prevstate.activeChat.recipient,
                    messages: prevstate.activeChat.messages.concat(data),
                },
            }));
        });

        socket.on("activeUsers", (data) => {
            this.setState({
                activeUsers: [ALL_CHAT].concat(data.activeUsers),
            });
        });
    }

    setActiveUser = (user) => {
        this.loadMessageHistory(user);
        this.setState({
            activeChat: {
                recipient: user,
                messages: [],
            },
        });
    };

    render() {
        if (!this.props.userId) return <div>Log in before using Journal</div>; //will never happen

        return (
            <>
                <div className="u-flex u-relative Journal-container">
                    {/* <div className="Journal-userList">
                        <JournalChats
                        setActiveUser={this.setActiveUser}
                        userId={this.props.userId}
                        users={this.state.activeUsers}
                        active={this.state.activeChat.recipient}
                        />
                    </div> */}
                    <div className="Journal-chatContainer">
                        <JournalMessages data={this.state.activeChat} canSend={this.props.canSend}/>
                    </div>
                </div>
            </>
        );
    }
}

export default Journal;
