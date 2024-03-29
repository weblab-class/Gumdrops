import React, { Component } from "react";
import "../../utilities.css";
import "./NewPostInput.css";
import { get } from "../../utilities";
import "./Thumbnail.css";
/**
 * RandomImage is a component for a random picture from the database
 *
 * Proptypes
 * @param {String} projectId
 */

class Thumbnail extends Component {
    _isMounted = false;

    constructor(props) {
      super(props);
      this.state = {
          image : undefined,
      }
    }

    componentDidMount() {
      this._isMounted = true;
      let query = {projectId: this.props.projectId};
      get("/api/thumbnail",query).then(result=>{
        if(this._isMounted){
          this.setState({
              image: result.image,
          });
        };
      });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      return (
          <img className="Thumbnail-image" src={this.state.image}/>
      );
    }
  }

export default Thumbnail;
