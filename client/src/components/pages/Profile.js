import React, { Component } from "react";
import { get, post } from "../../utilities";
import ProfileImage from "../modules/ProfileImage.js";
import ProfileBio from "../modules/ProfileBio.js"
import "../../utilities.css";
import "./Profile.css"

//Props
//userId: String (used in special routing from App.js)
//viewerId: String (identifies the person viewing the profile)
class Profile extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            editing: false,
            roles: undefined,
            userRoles: undefined
        };
      }

    clickedEditing=(event)=>{
        event.preventDefault();
        this.setState((prevstate) => ({
            editing: !prevstate.editing,
        }));
    }

    componentDidMount() {
        this._isMounted = true;
        get(`/api/user`, { userid: this.props.userId }).then((user) => {
            if(this._isMounted){
                this.setState({
                    user: user 
                });
            };
        });
        console.log("Preparing profile for user "+this.props.userId)
        get("/api/projects", {userid: this.props.userId}).then((dataObj=>{ //find some way to get all the roles of a user
            let rolesObj = {};
            dataObj.projects.forEach((project)=>{
                project.collaborators.forEach((person)=>{
                    if(person.userId===this.props.userId){
                        rolesObj[person.role] = 1;
                    }
                });
            });
            if(this._isMounted){
                this.setState({
                    roles: Object.keys(rolesObj),
                });
            }
        }));
        get("/api/all-user-roles",{projectId:this.props.projectId}).then((result) => {
            if(this._isMounted){
                this.setState({
                    userRoles: result,
                });
            }
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    generateRoles = () => {
        let result = [];
        this.state.roles.forEach((name, i)=>{
            this.state.userRoles.forEach((role)=>{
                if(name===role.roleName){
                    if(i===this.state.roles.length-1){
                        result.push(
                            <div className="u-inlineBlock" key={name}>
                                <p 
                                    style={{color: role.styling.color, fontWeight: role.styling.fontWeight, fontSize: role.styling.fontSize}}
                                    className="u-inlineBlock Profile-role"
                                >
                                    {`@${name}`}
                                </p>
                            </div>
                        );
                    } else{
                        result.push(
                            <div className="u-inlineBlock" key={name}>
                                <p 
                                    style={{color: role.styling.color, fontWeight: role.styling.fontWeight, fontSize: role.styling.fontSize}}
                                    className="u-inlineBlock Profile-role"
                                >
                                    {`@${name}`}
                                </p>
                                <p
                                    style={{fontWeight: role.styling.fontWeight, fontSize: role.styling.fontSize}}
                                    className="u-inlineBlock Profile-role"
                                >
                                    {"=>"}
                                </p>
                            </div>
                        );
                    }
                }
            });
        });
        return result;
    }

    render() {
        if(this.state.user && this.state.roles && this.state.userRoles) {
            let roles;
            let output = (
                <>
                    <h2 className="u-textCenter Profile-welcome">Welcome, {!this.state.user ? "Anonymous" : this.state.user.name}</h2>
                    <hr></hr>
                    <ProfileImage userId={this.props.userId} editing={this.state.editing}/>
                    <ProfileBio userId={this.props.userId} editing={this.state.editing}/>
                </>
            );
            if(this.state.roles !== []){
                roles = (
                    <>
                        <h2 className="u-textCenter Profile-rolesTitle">Roles:</h2>
                        <div className="Profile-roles">
                            {this.generateRoles()}
                        </div>
                    </>
                );
            } else{
                roles = (
                    <>
                        <h2 className="u-textCenter Profile-rolesTitle">Roles:</h2>
                        <p className="u-textCenter">No roles yet</p>
                    </>
                );
            }
            if(this.state.editing) {
                return(
                    <>
                        {output}
                        {roles}
                        <button 
                            type = "submit"
                            className = "Profile-edit u-pointer"
                            value = "Submit"
                            onClick={this.clickedEditing}
                            >Done
                        </button>
                    </>
                );
            }
            if(this.props.userId===this.props.viewerId) {
                return(
                    <>
                        {output}
                        {roles}
                        <button 
                            type = "submit"
                            className = "Profile-edit u-pointer"
                            value = "Submit"
                            onClick={this.clickedEditing}
                            >Edit
                        </button>
                    </>
                );
            }
            return(
                <>
                    {output}
                    {roles}
                </>
            );
        }
        return <h1>Loading!</h1>
    }
}
export default Profile;