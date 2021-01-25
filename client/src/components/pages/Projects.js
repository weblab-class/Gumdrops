import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import ProjectDisplay from "../modules/ProjectDisplay.js";
import CreateProjectDisplay from "../modules/CreateProjectDisplay.js";
import "./Projects.css";
//Usage: This is equivalent to the project dashboard

//Props
//userId : String (passed down from App.js)

class Projects extends Component {
    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            projects: undefined,
        };
    }

    componentDidMount(){
        this._isMounted = true;
        if(this.props.userId) {
            console.log("Going into handleInit with user");
            get("/api/projects",{ userid:this.props.userId })
            .then((projectObj)=>{
                if(this._isMounted){
                    this.setState({
                        projects: projectObj.projects,
                    });
                };
            }).then(console.log("Projects: "+this.state.projects))
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    componentDidUpdate() {
        if(!this.state.projects){
            if(this.props.userId) {
                console.log("Going into handleInit with user");
                get("/api/projects",{ userid:this.props.userId })
                .then((projectObj)=>{
                    if(this._isMounted){
                        this.setState({
                            projects: projectObj.projects,
                        });
                    };
                }).then(console.log("Projects: "+this.state.projects))
            }
        }
    }

    render() {
        if(this.state.projects && this.state.projects[0]){
            const projectList = [...this.state.projects];
            projectList.forEach((projects, i) => console.log("Project " + i + ": " + projects.name));
            return (
                <div>
                <h1 className="Projects-title"> My Projects</h1>
                    <section className="u-flex Projects-container">
                        {projectList.map((project)=> (
                            <ProjectDisplay 
                                userId={this.props.userId} 
                                projectName={project.name} 
                                projectId={project._id}
                                showRole={true}
                                key={project._id} 
                            />
                        ))}
                        <CreateProjectDisplay />
                    </section>
                </div>
            );
        }
        console.log("At Projects.js, the userId props is "+this.props.userId);
        if(this.props.userId){
            return(
                <div>
                    <h1>This is your project dashboard page. Try creating a new Project!</h1>
                    <section className="u-flex Projects-container">
                        <CreateProjectDisplay/>
                    </section>
                </div>
                
            );
        }
        return(
            <div>
                <h2>Hello! Please log in to see your projects</h2>
            </div>
        );
    }
}
export default Projects;