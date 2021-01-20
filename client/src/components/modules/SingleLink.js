import React, {Component} from "react";
import "./NewPostInput.css";
import "../../utilities.css"

/**
 * Single Link renders a single Link 
 * @param {String} link: a single link string
 * @param {Integer} linkNo : a number that sends the order of the link 
 */

 class SingleLink extends Component {
     constructor(props){
         super(props);
         this.setState({
            link:"",
            linkNo: 0,
            editing: false
         })
     }
 }