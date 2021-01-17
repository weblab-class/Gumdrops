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
    componentDidMount(){
        
    }

    render() {
        console.log("ProjectDisplay was called.");
        return (
            <div className="ProjectDisplay-container">
                <Link to={`/project/${this.props.projectId}`}>
                    <div className="ProjectDisplay-image"></div>
                    <div className="ProjectDisplay-text u-inlineBlock u-textCenter">
                        {this.props.projectName}
                    </div>
                </Link>
            </div>
        );
    }
}

export default ProjectDisplay;