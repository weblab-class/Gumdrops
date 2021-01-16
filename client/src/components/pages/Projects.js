import React, { Component } from "react";
import { get, post } from "../../utilities.js";
//Usage: This is equivalent to the project dashboard

//Props
//userId : String (passed down from App.js)

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: undefined,
        };
    }

    handleInit = () =>{
        if(this.props.userId != undefined){
            console.log("Going into handleInit with user");
            get("/api/projects",{ userid:this.props.userId })
            .then((projectObj)=>{
                this.setState({
                    projects: projectObj.projects,
                })
            })
        }   
    }
    componentDidMount(){
        this.handleInit();
    }
    componentDidUpdate() {
        //this.handleInit();
    }
    render() {
        let projectList;
        if(this.state.projects){
            console.log("Type of projects "+typeof(this.state.projects));
            return this.state.projects.map((value)=>
                 <h3>My project name is {value.name}</h3>);
        }
        console.log("At project.js, the userId props is "+this.props.userId);
        if(this.props.userId==undefined){
            return(
            <div>
                <h2>Hello! Please log in to see your projects</h2>
            </div>);
        }
        return(
            <div>
                <h1>This is your project dashboard page</h1>
                {this.projectList}
            </div>
        );
    }
}
export default Projects;