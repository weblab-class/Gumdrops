import React, {Component} from "react";
import "../../utilities.css";
import "./StoryCard.css"
/**
 * Single Text this renders the text on the story
 * cards  
 * 
 * Proptypes
 * @param {string} defaultText placeHolder Text
 * @param {String} prevStory: already existing story
 * @param {boolean} isEditing: tells the user if you are editing
 * @param {function} onSubmit
 * @param {Object} userRoles (where key is userName and value is an Array of [userName,userId,roleStyle])
 */
class SingleText extends Component{
    constructor(props){
        super(props);
        this.state={
            tempvalue: this.props.prevStory,
        }
    }
    //called whenver the user types in the input box
    handleChange = (event)=>{
        this.setState({
            tempvalue: event.target.value,
        })
    }
    //called when the user hit the button
    handleSubmit = (event)=>{
        event.preventDefault();
        // console.log(this.state.tempvalue)
        this.props.onSubmit && this.props.onSubmit(this.state.tempvalue);
    }
    componentDidMount(){
        // console.log(this.state.tempvalue);
        // console.log(this.props.prevStory);
    }

    render(){
        let story = <>{this.state.tempvalue}</>;
        let outputArray;
        if(this.props.isEditing){
            story =(
                <>
                <textarea
                rows = "6"
                type= {this.props.type}
                placeholder={this.props.defaultText}
                value={this.state.tempvalue}
                onChange={this.handleChange}
                className="u-flex StoryCard-textAreaContainer"
                />
                <button
                type="submit"
                className="u-flex StoryCard-margin"
                value="Submit"
                onClick={this.handleSubmit}
                >
                Save
                </button>
            </>
            )
        } else if(this.props.userRoles) {
          let text = this.state.tempvalue;
          outputArray = [];
          while(text!=="") {
            let nextAt = text.indexOf("@");
            if(nextAt === -1) {
                outputArray.push(text);
                break;
            } else {
              if(nextAt !== 0){ 
                outputArray.push(text.substring(0,nextAt));
              }
              text = text.substring(nextAt);
              let userFound = false;
              for (const [key, value] of Object.entries(this.props.userRoles)) {
                if(text.startsWith(key)){
                  // console.log("I found username "+key);
                  outputArray.push(key);
                  text = text.substring(key.length);
                  userFound = true;
                  break;
                }
              }
              if(!userFound) { //did not find anything
                outputArray.push("@");
                text = text.substring(1);
              }
            }
            }
        }
        return(
            <>
            { (!this.props.isEditing && this.props.userRoles) ?
            outputArray.map((value, i)=>{
                if(value in this.props.userRoles){
                    return <span>
                            <a style={this.props.userRoles[value][2]} key={i} href={"/profile/"+this.props.userRoles[value][1]}>{value}</a>
                        </span>;
                } else {
                    return <span key={i}>{value}</span>;
                }
            })
            : story
            }
            </>
        );
    }
}
export default SingleText;