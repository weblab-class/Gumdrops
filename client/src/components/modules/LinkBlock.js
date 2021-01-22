import React, { Component} from "react";
import { render } from "react-dom";
import {post} from "../../utilities";
import InputBox from "./InputBox.js";
import { Link } from "@reach/router";
import SingleLink from "./SingleLink.js";
import "../../utilities.css";
import "./StoryCard.css";

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
            linksData:[],
        }
    }
    setLinks=()=>{
        if(this.props.linkArr.length!==0){
            post("/api/link",{links:this.props.linkArr}).then((newLinks)=>{
                this.setState({
                    linksData:newLinks
                });
            });
        }
    }
    addLink=(newLink)=>{
        let tempArray = [...this.props.linkArr];
        if(!(tempArray.includes(newLink))){
            post("/api/link",{links: [newLink]}).then((newData)=>{
                console.log(newData)
                this.setState({
                    linksData:this.state.linksData.concat([newData[0]]),
                
                });
                this.props.onEdit && this.props.onEdit(newLink);
            }); 
        }
        else{
            console.log("already exists") 
        }  
    }
    deleteLink=(removedLink)=>{
        console.log("was recieved in link block")
        let tempArray = [...this.props.linkArr];
        let tempData = [...this.state.linksData];
        for(let i=0; i<this.props.linkArr.length;i++){
            if(this.props.linkArr[i] == removedLink){
                tempArray.splice(i,1);
                tempData.splice(i,1);
                this.setState({
                    linksData:tempData,
                
                });
                this.props.onDel && this.props.onDel(tempArray);
                break;
            }
            console.log(tempArray);
        }
        
    }
    componentDidMount(){
        this.setLinks();
    }
    render(){
        let linkList = <div className="u-textCenter StoryCard-centerLinks">No links</div>;
        let button = <></>;
        let isthereLink = this.state.linksData.length!==0; 
        if(this.props.editing){
            console.log("editing");
            button = (
                <InputBox
                    defaultText ="Enter Link"
                    onSubmit ={this.addLink}
                    type = "url"
                    buttonMessage = "Add Link"
                />
            );
        }
        if(isthereLink){
            linkList = this.state.linksData.map((linkObj,i)=>(   
                <SingleLink 
                    onDelete = {this.deleteLink} 
                    editing = {this.props.editing} 
                    key ={linkObj.url} 
                    linkObj = {linkObj}
                />
            ));
            return(
                <>
                    {linkList}
                    {button}
                </>
            )
        }
        else{
            if(this.props.editing){
                linkList = "";
            }
        }
        return(
            <>
                {linkList}
                {button}
            </>
        );
    }
}
export default LinkBlock;