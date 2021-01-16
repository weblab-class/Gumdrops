import React, { Component } from "react";
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
        return (
            <Link to={`/project/${this.props.projectId}`} className="ProjectDisplay-card u-inlineBlock">
                <div className="u-textCenter ProjectsDisplay-name">{this.props.projectName}</div>
            </Link>
            // <button
            // type="submit"
            // className="NewPostInput-button u-pointer"
            // value="Submit"
            // onClick={this.handleSubmit}
            // >
            //     Submit
            // </button>
        );
    }
}
