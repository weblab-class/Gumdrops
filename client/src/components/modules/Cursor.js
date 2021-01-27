import React, {Component} from "react";
import "../../utilities.css";

/**
 * Cursor is a component used to provide unique styling to the cursor based on specific actions.
 * NOT BEING USED
 * Proptypes 
 * 
 */

class Cursor extends Component {

    constructor(props) {
        super(props);
        this.state = {
          left: 0,
          top: 0,
        };
      }
    
  componentDidMount() {
    // When the component is mounted, add your DOM listener.
    document.addEventListener("mousemove", this.handleCursor);
    document.addEventListener("mousedown", this.handleDown);
    document.addEventListener("mouseup", this.handleUp);
    document.addEventListener("mouseleave", this.handleOut);
  }

  componentWillUnmount() {
    // Make sure to remove the DOM listener when the component is unmounted.
    document.removeEventListener("mousemove", this.handleCursor);
    document.removeEventListener("mousedown", this.handleDown);
    document.removeEventListener("mouseup", this.handleUp);
    document.removeEventListener("mouseleave", this.handleOut);
  }

  handleCursor = (e) => {
    const cursor = document.querySelector(".cursor")
    cursor.style.left = `${e.pageX}px`
    cursor.style.top = `${e.pageY}px`
    
    //Alternatively you can do:
    //const cursor = document.getElementsByClassName('cursor')[0];     
    //cursor.setAttribute('style','top:'+e.pageY+'px; left:'+ e.pageX+'px;');
  }

  handleDown= (e) => {
    const cursor = document.querySelector(".cursor");
    cursor.style.backgroundColor = "lightseagreen";
  }

  handleUp= (e) => {
    const cursor = document.querySelector(".cursor");
    cursor.style.backgroundColor = "";
  }

  handleOut= (e) => {
    const cursor = document.querySelector(".cursor");
    //Still needs to be worked on
    //cursor.style.border = "none";
  }


  render() {
    return (
      <div className='cursor'>
      </div>
    )
  }
}

export default Cursor;