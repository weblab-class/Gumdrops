//THIS IS CURRENTLY DEAD CODE, BUT IT CAN BE USED TO DISPLAY A LIST OF USERS

// import React, { Component } from "react";
// import SingleUser from "./SingleUser.js";

// import "./SingleUser.css";

// /**
//  * List of users that are online to chat with and all chat
//  *
//  * Proptypes
//  * @param {UserObject[]} users to display
//  * @param {UserObject} active user in chat
//  * @param {string} userId id of current logged in user
//  * @param {(UserObject) => ()} setActiveUser function that takes in user, sets it to active
//  */
// class JournalChats extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <>
//         <h3>Open Chats</h3>
//         {this.props.users
//           .map((user, i) => (
//             <SingleUser
//               key={i}
//               setActiveUser={this.props.setActiveUser}
//               user={user}
//               active={user === this.props.active}
//             />
//           ))}
//       </>
//     );
//   }
// }

// export default JournalChats;
