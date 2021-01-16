import React, { Component } from "react";
import { Link } from "@reach/router";
import "./ProjectDisplay.css";
import "../../utilities.css"

//Props
//userId : String (passed down from App.js)
//projectId : String (passed down from Projects.js)
//projectName : String (passed down from Projects.js)

class ProjectDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("ProjectDisplay was called.");
        return (
            <div className="ProjectDisplay-container">
                <div className="ProjectDisplay-image"></div>
                <Link to={`/project/${this.props.projectId}`} className="ProjectDisplay-link u-inlineBlock">
                    <div className="u-textCenter">{this.props.projectName}</div>
                </Link>
            </div>
        );
    }
}

export default ProjectDisplay;