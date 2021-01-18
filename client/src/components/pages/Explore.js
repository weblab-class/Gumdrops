import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import ProjectDisplay from "../modules/ProjectDisplay.js";

//Props
//userId : String (passed from App.js)
class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: undefined,
        }
    }

    handleInit = () =>{
        console.log("Log 1: "+this.state.projects)
        console.log("Going into handleInit for explore");
        get("/api/explore",{})
        .then((projects)=>{
            this.setState({
                projects: projects,
            })
        }).then(console.log("Projects: "+this.state.projects))
        console.log("Log 2: "+this.state.projects)
    }

    componentDidMount(){
        this.handleInit();
    }

    render() {
        if(this.state.projects) {
            console.log("Log 3: "+this.state.projects)
            const projectList = [...this.state.projects];
            //projectList.forEach((projects, i) => console.log("Project " + i + ": " + projects.name));
            return(
                <div>
                    <marquee><h1>Alas! You have found the explore page!</h1></marquee>
                    <section className="u-flex">
                        {projectList.map((project)=> (
                            <ProjectDisplay 
                                userId={this.props.userId} 
                                projectName={project.name} 
                                projectId={project._id} 
                                key={project._id} 
                            />
                        ))}
                    </section>
                </div>
            );
        }
        return <h1>Loading Page!</h1>
    }
}
export default Explore;