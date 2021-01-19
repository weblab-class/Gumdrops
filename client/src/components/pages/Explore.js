import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import ProjectDisplay from "../modules/ProjectDisplay.js";
import "./Explore.css";

//Props
//userId : String (passed from App.js)
class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: undefined,
        }
    }

    handleInit = () => {
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

    organize = (projects, categories) => {
        projects.forEach((project)=>console.log(project.name));
        const dict = {
            "Music" : projects.slice(0, 2),
            "Math" : projects.slice(2, 5),
            "Science" : projects.slice(5, projects.length),
        };
        dict[categories[0]].forEach((project)=>console.log("Project: "+project.name));
        console.log("Projects split into Music: "+dict[categories[0]]+", Math: "+dict[categories[1]]+", and Science: "+dict[categories[2]])
        return(dict);
    }

    componentDidMount(){
        this.handleInit();
    }

    render() {
        if(this.state.projects) {
            console.log("Log 3: "+this.state.projects)
            const projectList = [...this.state.projects];
            const categoryList = ["Music", "Math", "Science"];
            const organizedLists = this.organize(projectList, categoryList);
            //projectList.forEach((projects, i) => console.log("Project " + i + ": " + projects.name));
            const projects1 = organizedLists[categoryList[0]];
            const projects2 = organizedLists[categoryList[1]];
            const projects3 = organizedLists[categoryList[2]];
            return(
                <div>
                    <marquee><h1>Alas! You have found the explore page!</h1></marquee>
                        <div><hr></hr>{categoryList[0]}<hr></hr></div>
                        <section className="u-flex Explore-container">
                            {projects1.map((project) => (
                                <ProjectDisplay 
                                    userId={this.props.userId} 
                                    projectName={project.name} 
                                    projectId={project._id}
                                    showRole={false}
                                    key={project._id} 
                                />
                            ))}
                        </section>
                        <div><hr></hr>{categoryList[1]}<hr></hr></div>
                            <section className="u-flex Explore-container">
                            {projects2.map((project) => (
                                <ProjectDisplay 
                                    userId={this.props.userId} 
                                    projectName={project.name} 
                                    projectId={project._id}
                                    showRole={false}
                                    key={project._id} 
                                />
                            ))}
                        </section>
                        <div><hr></hr>{categoryList[2]}<hr></hr></div>
                        <section className="u-flex Explore-container">
                            {projects3.map((project) => (
                                <ProjectDisplay 
                                    userId={this.props.userId} 
                                    projectName={project.name} 
                                    projectId={project._id}
                                    showRole={false}
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