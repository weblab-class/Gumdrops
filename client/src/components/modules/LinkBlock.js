import React, { Component} from "react";
import { render } from "react-dom"
import "../../utilities.css"

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
        
    }
    componentDidMount(){
        this.getLinks();
    }
    render(){
        let linkList = null;
        let isthereLink = this.props.linkArr.length; 
        if(this.props.editing){
                
                

                
            }
        else{ 
        let linkList = null;
        let isthereLink = this.props.linkArr.length;  
            if(isthereLink){
                this.props.linkArr.map((linkObj)=>(
                <a href = {linkObj}></a> 
                ));
            }else{
                linkList=<p>No links</p>
            }
        }
        return(
            <div className = "u-flex">
                {linkList}
            </div>
        )
    }
}
export default LinkBlock