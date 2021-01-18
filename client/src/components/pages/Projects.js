import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import ProjectDisplay from "../modules/ProjectDisplay.js";
import CreateProjectDisplay from "../modules/CreateProjectDisplay.js";
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
        if(this.props.userId) {
            console.log("Going into handleInit with user");
            get("/api/projects",{ userid:this.props.userId })
            .then((projectObj)=>{
                this.setState({
                    projects: projectObj.projects,
                })
            }).then(console.log("Projects: "+this.state.projects))
        }   
    }
    componentDidMount(){
        this.handleInit();
    }
    componentDidUpdate() {
        //this.handleInit();
    }
    render() {
        if(this.state.projects){
            console.log("Type of projects "+typeof(this.state.projects));
            console.log("Project: "+this.state.projects[0].name);
            console.log("ProjectId: "+this.state.projects[0]._id);
            console.log("UserId: "+this.props.userId);
            const projectList = [...this.state.projects];
            projectList.forEach((projects, i) => console.log("Project " + i + ": " + projects.name));
            return (
                <div>
                <h1> This is what you came for</h1>
                    <section className="u-flex">
                        {projectList.map((project)=> (
                            <ProjectDisplay 
                                userId={this.props.userId} 
                                projectName={project.name} 
                                projectId={project._id} 
                                key={project._id} 
                            />
                        ))}
                        <CreateProjectDisplay />
                    </section>
                </div>
            );
        }
        console.log("At Projects.js, the userId props is "+this.props.userId);
        if(this.props.userId==undefined){
            return(
            <div>
                <h2>Hello! Please log in to see your projects</h2>
            </div>);
        }
        return(
            <div>
                <h1>This is your project dashboard page. Try creating a new Project!</h1>
            </div>
        );
    }
}
export default Projects;