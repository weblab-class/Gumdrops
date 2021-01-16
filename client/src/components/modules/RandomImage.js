import React, { Component } from "react";
import "../../utilities.css";
import "./NewPostInput.css";
import { get } from "../../utilities";

/**
 * RandomImage is a component for a random picture from the database
 *
 * Proptypes
 */

class RandomImage extends Component {
    constructor(props) {
      super(props);
      this.state = {
          image : undefined,
      }
    }

    componentDidMount() {
      let query = {projectId: "123456"};
      get("/api/thumbnail",query).then(result=>{
          this.setState({
              image: result.image,
          })
          console.log("This state is being changed to "+result.image.substr(0,200));
      });
    }

    render() {
      return (
        <div className="u-flex">
            <img src={this.state.image}/>
        </div>
      );
    }
  }

export default RandomImage;
