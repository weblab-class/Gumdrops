import React, { Component} from "react";
import { render } from "react-dom"
import "../../utilities.css"
import {post} from "../../utilities";
import InputBox from "./InputBox.js";

/**
 * Link Block formats all the links
 * that are placed in a story card 
 * Proptypes 
 * @param {[Array]} linkArr: an array with links 
 * 
 */

class LinkBlock extends Component {
    constructor(props){
        super(props);
        this.state={
            links:[],
        }
    }
    setLinks=()=>{
        this.setState({
            links:this.props.linkArr
        })
    }
    editLink=(newLink)=>{
        this.setState({
            links: this.state.links.concat([newLink]),
        })
        this.props.onEdit && this.props.onEdit({links:this.state.links});
    }
    componentDidMount(){
        this.setLinks();
    }
    render(){
        let linkList = null;
        let button = <div></div>
        let isthereLink = this.props.linkArr.length; 
        if(this.props.editing){
                console.log("editing ");
                button = <InputBox
                defaultText ="Enter Link"
                onSubmit ={this.editLink}
                type = "url"
                buttonMessage = "Add Link"
                />
            }
        if(isthereLink){

            post("/api/link",this.state.links).then((linkPrev)=>{
                linklist = linkprev;
            })
            return(
                <div className = "u-flex ">
                    {linkList}
                    {button}
                </div>
            )
        }else{
            return(
            linkList=<p>No links</p>
            )
        }
        
    }
}
export default LinkBlock;