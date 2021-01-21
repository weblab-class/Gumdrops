import React, { Component} from "react";
import { render } from "react-dom"
import "../../utilities.css"
import {post} from "../../utilities";
import InputBox from "./InputBox.js";
import { Link } from "@reach/router";

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
            links: [],
            linksData:[]
        }
    }
    setLinks=()=>{
        this.setState({
            links:this.props.linkArr
        })
        if(this.props.linkArr.length!==0){
            let  tempData = []
            post("/api/link",{links: this.state.links}).then((linkPrev)=>{
                tempData = linkPrev;
            });
            this.setState({
                linksData:tempData
            });
        }
    }
    addLink=(newLink)=>{
        
        this.props.onEdit && this.props.onEdit(newLink);
        this.setState({
            links:this.state.links.concat([newLink]),
        })
        if(this.props.linkArr.length!==0){
            let  tempData = []
            post("/api/link",{links: newLink}).then((linkPrev)=>{
                tempData = linkPrev;
            });

            this.setState({
                linksData:this.state.linksData.concat([tempData]),
            });
        }

    }
    componentDidMount(){
        this.setLinks();
    }
    render(){
        let linkList = "No Links";
        let linkData = [];
        let button = "";
        let isthereLink = this.props.linkArr.length!==0; 
        if(this.props.editing){
            console.log("editing ");
            button = <InputBox
            defaultText ="Enter Link"
            onSubmit ={this.addLink}
            type = "url"
            buttonMessage = "Add Link"
            />
        }
        if(isthereLink){
            linkList = this.state.links.map((linkObj)=>
            (
                <a href = {linkObj}>Links</a>
            ));
            console.log(linkList);
            return(
                <div>
                    {linkList}
                    {button}
                </div>
            )
        }
        else{
                if(this.props.editing) linkList = ""
            return(
                <div>
                    {linkList}
                    {button}
                </div>
           )
        }
    
        
    }
}
export default LinkBlock;