import React, { Component} from "react";
import { render } from "react-dom"

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
    }

    render(){
        let linkList = null;
        let isthereLink = this.props.linkArr.length;
        if(isthereLink){
            this.props.linkArr.map((linkObj)=>(
               <a href = {linkObj}></a> 
            ));
        }else{
            linkList=<><div>No project document links have been posted</div><div>(To be supported)</div></>
        }
        return(
            <>
            {linkList}
            </>
        )
    }
}
export default LinkBlock