import React, { Component } from "react";
import "../../utilities.css";
import "./NewPostInput.css";
import { get } from "../../utilities";

/**
 * RandomImage is a component for a random picture from the database
 *
 * Proptypes
 * @param {String} projectId
 */

class Thumbnail extends Component {
    constructor(props) {
      super(props);
      this.state = {
          image : undefined,
      }
    }

    componentDidMount() {
      let query = {projectId: this.props.projectId};
      get("/api/thumbnail",query).then(result=>{
          this.setState({
              image: result.image,
          })
      });
    }

    render() {
      return (
          <img style={{height: "100%", width: "100%", objectFit: "contain"}} src={this.state.image}/>
      );
    }
  }

export default Thumbnail;
