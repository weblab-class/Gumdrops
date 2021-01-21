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
        console.log("Going into handleInit for explore");
        get("/api/explore",{})
        .then((projects)=>{
            this.setState({
                projects: projects,
            })
        }).then(console.log("Projects: "+this.state.projects))
    }

    makeCategories= (projects) => {
        let categories = {};
        let categoriesProjects = {};
        projects.forEach((project) => {
            project.tags.forEach((tag) => {
                if(!(tag in categories)){
                    categories[tag] = 1;
                    categoriesProjects[tag] = [project];
                } else {
                    categories[tag] += 1;
                    categoriesProjects[tag].push(project);
                }
            });
        });
        let categoriesArray = [];
        for (const [key, value] of Object.entries(categories)) {
            categoriesArray.push({
                tag : key,
                count : value,
                projects : categoriesProjects[key],
            });
        }
        return categoriesArray;
    }

    generateOutput = (categories) => {
        let output = [];
        let colors = ["Aqua", "Pink", "Primary"];
        let i=0;
        categories.sort(function(a, b) {
            return b.count - a.count;
        });
        categories.forEach((catObj)=>{
            output.push(<div className={`Explore-tag${colors[i]}`}>{catObj.tag}</div>)
            output.push(
                <section className="u-flex Explore-container">
                    {catObj.projects.map((project)=>(
                        <ProjectDisplay 
                            userId={this.props.userId} 
                            projectName={project.name} 
                            projectId={project._id}
                            showRole={false}
                            key={project._id} 
                        />
                    ))}
                </section>
            );
            if(i===2){
                i=0;
            } else {
                i+=1;
            };
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
                <div>
                    <h1 className="Explore-search u-textCenter">Search bar goes here</h1>
                    {output}
                </div>
            );
        }
        return <h1>Loading Page!</h1>
    }
}
export default Explore;