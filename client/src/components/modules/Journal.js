import React, { Component } from "react";
import JournalMessages from "./JournalMessages.js";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";

import "./Journal.css";

// Props
// userId: String (id of current logged in user)
// projectId: String (id of the project it corresponds to)
// canSend: Boolean (dictates whether user can send messages in the journal)
// userRoles: Object (where key is userName and value is an Array of [userName,userId,roleStyle])
// isStoryTelling: Boolean (indicates whether storycard presentation has been activated)

class Journal extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.tagCount = 0;
        this.isTagCountingDone = false;
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

    stopTagCount = () => {
        if(this.tagCount > 0 && !this.isTagCountingDone) { //triggered only when count is non-zero and isTagCountingDone is false before.
            this.isTagCountingDone = true;
            post("/api/project-journal-tags",{ projectId: this.props.projectId, numJournalTags: this.tagCount})
                .then((result)=>console.log("Journal Tag data saved"));
        }
    }

    incTagValue = (value) => { //receives value from JournalMessage to increment tagCount by 
        this.tagCount += value;
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
        this._isMounted = true;
        this.loadMessageHistory(this.state.activeChat.recipient);
        console.log("In Journal.js, my current projectId is "+this.state.activeChat.recipient._id);
        socket.on("message", (data) => {
            console.log("Received update notice");
            if(this._isMounted){
                this.setState((prevstate) => ({
                    activeChat: {
                        recipient: prevstate.activeChat.recipient,
                        messages: prevstate.activeChat.messages.concat(data),
                    },
                }));
            };
        });

        socket.on("deletedMessage", (deleted) => {
            console.log("Received update notice");
            if(this._isMounted){
                this.setState((prevstate) => ({
                    activeChat: {
                        recipient: prevstate.activeChat.recipient,
                        messages: prevstate.activeChat.messages.filter((message) => message._id !== deleted._id),
                    },
                }));
            };
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        console.log("Journal is re-rendering");
        // if (!this.props.userId) return <div>Log in before using Journal</div>;
        return (
            <div className="u-flex u-relative Journal-container"> {/*Journal-chatContainer">*/}
                <JournalMessages 
                    data={this.state.activeChat} 
                    canSend={this.props.canSend} 
                    userRoles={this.props.userRoles} 
                    userId={this.props.userId}
                    isTagCountingDone = {this.isTagCountingDone}
                    incTagValue = {(value)=>this.incTagValue(value)}
                    stopTagCount = {()=>this.stopTagCount()}
                    isStoryTelling={this.props.isStoryTelling}
                />
            </div>
        );
    }
}

export default Journal;
