import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import ProjectDisplay from "../modules/ProjectDisplay.js";
import { NewPostInput } from "../modules/NewPostInput.js";
import Fuse from "fuse.js";
// import "typeahead.js";
import "./Explore.css";

//Props
//userId : String (passed from App.js)
class Explore extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            projects: undefined,
            searchProjects: undefined,
            searching: false,
        }
    }

    handleInit = () => {
        console.log("Going into handleInit for explore");
        get("/api/explore",{})
        .then((projects)=>{
            if(this._isMounted){
                this.setState({
                    projects: projects,
                })
            };
        })
    }

    search = (value) => {
        console.log("Searching for: "+value);
        let options = {
            keys: ["name", "tags"],
        };
        let fuse = new Fuse(this.state.projects, options);
        const rawResults = fuse.search(value);
        let result = [];
        rawResults.forEach((res)=>{
            result.push(res.item);
        });
        if(this._isMounted){
            this.setState({
                searchProjects: result,
                searching: true,
            });
        }
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
                            isExplore={true}
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

    clickedBack = () => {
        if(this._isMounted){
            this.setState({
                searching: false,
            });
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.handleInit();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        if(this.state.projects) {
            let categoriesList;
            let output;
            let button;
            if(this.state.searching){
                if(this.state.searchProjects.length === 0){
                    output = <p className="u-textCenter">Sorry, no results were found from your search</p>;
                } else {
                    categoriesList = this.makeCategories([...this.state.searchProjects]);
                    output = this.generateOutput(categoriesList);
                }
                button = (
                    <span>
                        <button
                            type="submit"
                            className="Explore-button u-pointer"
                            value="Submit"
                            onClick={this.clickedBack}
                        >
                            Back
                        </button>
                    </span>
                );
            } else{
                categoriesList = this.makeCategories([...this.state.projects]);
                categoriesList.sort(function(a, b) {
                    return b.projects.length - a.projects.length;
                });
                output = this.generateOutput(categoriesList);
            }
            if(button){
                return(
                    <>
                        <div className="Explore-search">
                            {button}
                            <span>
                                <div className="Explore-searchInput u-inlineBlock">
                                    <NewPostInput 
                                        defaultText="Search (You can search by project name or tag)"//(Try searching for a project by name OR try searching by tag (e.g., #math))" 
                                        onSubmit={this.search}
                                        size="100%"
                                    />
                                </div>
                            </span>
                        </div>
                        {output}
                    </>
                );
            }
            return(
                <>
                    <div className="Explore-search" /*id="bloodhound"*/>
                        <span className="Explore-searchInput">
                            <NewPostInput 
                                defaultText="Search (You can search by project name or tag)"//(Try searching for a project by name OR try searching by tag (e.g., #math))" 
                                onSubmit={this.search}
                                /*className="typeahead"*/
                            />
                        </span>
                    </div>
                    {output}
                </>
            );
        }
        return <h1>Loading Page!</h1>
    }
}
export default Explore;