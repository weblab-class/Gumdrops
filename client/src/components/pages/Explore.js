import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import ProjectDisplay from "../modules/ProjectDisplay.js";
import { NewPostInput } from "../modules/NewPostInput.js";
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
        console.log("Going into handleInit for explore");
        get("/api/explore",{})
        .then((projects)=>{
            this.setState({
                projects: projects,
            })
        }).then(console.log("Projects: "+this.state.projects))
    }

    search = (value) => {
        console.log("Searching for: "+value);
        //write search logic
    }

    makeCategories= (projects) => {
        let categoriesProjects = {};
        projects.forEach((project) => {
            project.tags.forEach((tag) => {
                if(!(tag in categoriesProjects)){
                    categoriesProjects[tag] = [project];
                } else {
                    categoriesProjects[tag].push(project);
                }
            });
        });
        let categoriesArray = [];
        for (const [key, value] of Object.entries(categoriesProjects)) {
            categoriesArray.push({
                tag : key,
                projects : value,
            });
        }
        return categoriesArray;
    }

    generateOutput = (categories) => {
        let output = [];
        let colors = ["Aqua", "Green", "Yellow"];
        let i=0;
        let j=0;
        categories.sort(function(a, b) {
            return b.projects.length - a.projects.length;
        });
        categories.forEach((catObj)=>{
            output.push(<div className={`Explore-tag${colors[i]}`} key={catObj.tag}>{catObj.tag}</div>)
            output.push(
                <section className="u-flex Explore-container" key={`${j}`}>
                    {catObj.projects.map((project)=>(
                        <ProjectDisplay 
                            userId={this.props.userId} 
                            projectName={project.name} 
                            projectId={project._id}
                            showRole={false}
                            key={project._id +`${j}`} 
                        />
                    ))}
                </section>
            );
            if(i===2){
                i=0;
            } else {
                i+=1;
            };
            j++;
        });
        return output;
    }

    componentDidMount(){
        this.handleInit();
    }

    render() {
        if(this.state.projects) {
            const categoriesList = this.makeCategories([...this.state.projects]);
            const output = this.generateOutput(categoriesList);
            return(
                <>
                    <div className="Explore-search">
                        <NewPostInput 
                            defaultText="Search (Try searching for a project by name OR try searching by tag (e.g., #math))" 
                            onSubmit={this.search}
                        />
                    </div>
                    {output}
                </>
            );
        }
        return <h1>Loading Page!</h1>
    }
}
export default Explore;