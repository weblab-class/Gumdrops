import React, { Component } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities.js";
import "./ProjectDisplay.css";
import "../../utilities.css"
import Thumbnail from "./Thumbnail.js";

//Props
//userId : String (passed down from App.js)
//projectId : String (passed down from Projects.js/Explore.js)
//projectName : String (passed down from Projects.js/Explore.js)
//showRole : Boolean

class ProjectDisplay extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            role : null,
        }
    }

    componentDidMount(){
        this._isMounted = true;
        if (this.props.showRole) {
            get("/api/project", {projectId:this.props.projectId}).then((projectObj)=>{
                console.log("Project found: "+ projectObj.name)
                let users = projectObj.collaborators;
                users.forEach((user)=> {
                    console.log("Currently looking at user: "+user.userId);
                    if((user.userId === this.props.userId) && this._isMounted) {
                        console.log("Collaborator found with role: "+user.role);
                        this.setState({
                            role: user.role,
                        })
                    };
                });
            }).then(console.log("User Role: "+this.state.role))
        };
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        console.log("ProjectDisplay was called.");
        if (this.props.showRole && (this.state.role !== null)) {
            return (
                <div className="ProjectDisplay-container">
                    <Link to={`/project/${this.props.projectId}`}>
                        <div className="ProjectDisplay-image">
                            <Thumbnail projectId={this.props.projectId} />
                        </div>
                        <div className="ProjectDisplay-text u-inlineBlock u-textCenter">
                            <div>{this.props.projectName}</div>
                            <div>{"@"+this.state.role}</div>
                        </div>
                    </Link>
                </div>
            );
        };
        return (
            <div className="ProjectDisplay-container">
                <Link to={`/project/${this.props.projectId}`}>
                    <div className="ProjectDisplay-image">
                        <Thumbnail projectId={this.props.projectId} />
                    </div>
                    <div className="ProjectDisplay-text u-inlineBlock u-textCenter">
                        {this.props.projectName}
                    </div>
                </Link>
            </div>
        );
    }
}

export default ProjectDisplay;