import React, { Component } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities.js";
import "../../utilities.css"
import "./CreateProjectDisplay.css";
//Props


class CreateProjectDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link to="/createproject" style={{ textDecoration: 'none' }}>
            <div className="CreateProjectDisplay-container">
                <div className="CreateProjectDisplay-symbol">
                    +
                </div>
            </div>
            </Link>
            
        );
    }
}

export default CreateProjectDisplay;