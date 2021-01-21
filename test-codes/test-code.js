
//An old copy of the get("/projects") route:
/*
User.findById(req.query.userid).then( async (user)=>
{
  try{
    let arrayLength = user.projectIds.length;
    let outProjects = [];
    for (var i = 0; i < arrayLength; i++) {
      console.log("User is in "+user.projectIds[i]+'\n');
      let project = await Project.findById(user.projectIds[i]);
      outProjects.push(project);
      console.log("Found project "+project.name+"\n");
    }
    res.send({projects:outProjects});
  } catch(e) {
    res.status(400).json({message:e.message});
  }
}); */

//An old copy of the submit project functions in CreateProject.js's handleSubmit function
//Now replaced with async/await capabilities
     /* post("/api/project",projectObj).then(projectid=>{ 
        console.log(projectid);
        post("/api/user_add_project",{ //adds projectId to user's projectIds array
          userId: this.props.userId,
          projectId: projectid,
        }).then(event=>{ //wait for both project operations to finish
          if(!this.state.thumbnail){ //thumbnail empty
            this.setState({ //resets the fields
              projectName: "", 
              collaborators: "", 
              teamId: "", 
              tags: "",
              thumbnail: null, 
            });
            window.location.replace("/project/"+projectid); //redirect to new project page
          } else {
            //otherwise, proceeds to try add thumbnail to database
            console.log("Tries to add thumbnail to database");
            let thumbnailObj = {
              projectId : projectid,
              image: this.state.thumbnail,
            }
            //proceeds to upload thumbnail
            post("/api/thumbnail",thumbnailObj).then((res)=>{
              this.setState({ //resets the fields
                projectName: "", 
                collaborators: "", 
                teamId: "", 
                tags: "",
                thumbnail: null, 
              });
              window.location.replace("/project/"+projectid); //redirect to new project page
            });
          }
        });
      });*/


//The following was run in Profile.js componentDidMount() as tests/placeholders
      //The below command was used to trigger LinkPreview API
      //It is temporary placeholder.
      //let linkArray = ["https://gumdrops.herokuapp.com/","https://www.youtube.com/watch?v=fn3KWM1kuAw"];
      //post('/api/link',{links:linkArray}).then((data)=>console.log(data));
      //let myStyle = {color:"red",backgroundColor:"lightyellow",fontWeight:"bold",fontSize:"5em"};
      //let newRole = { roleName: "dragonator",styling: myStyle};
      //post("/api/role",newRole);

//The following is a copy of the render() function in Profile.js that was used as a test for message parsing for usernames
/*
render() {
    if(this.state.user) {
        if(this.state.editing) {
            return(
                <>
                    <h2 className="u-textCenter">Welcome, {!this.state.user ? "Anonymous" : this.state.user.name}</h2>
                    <hr></hr>
                    <ProfileImage userId={this.props.userId} editing={this.state.editing}/>
                    <ProfileBio userId={this.props.userId} editing={this.state.editing}/>
                    <button 
                    type = "submit"
                    className = "Profile-edit u-pointer"
                    value = "Submit"
                    onClick={this.clickedEditing}
                    >Done
                </button>
                </>
            );
        }
        let myStyle = {color:"red",backgroundColor:"lightyellow",fontWeight:"bold",fontSize:"5em"};
        let text2 = "this is a normal text @daniel and I see the light @harry";
        let text = "me, @daniel, and @david all went to the quarry together."
        let nameArray = ["@daniel","@harry"];
        let outputArray = [];
        while(text!=="") {
            let nextAt = text.indexOf("@");
            if(nextAt === -1) {
                outputArray.push(text);
                break;
            } else {
                outputArray.push(text.substring(0,nextAt));
                text = text.substring(nextAt);
                let userFound = false;
                for(var i=0; i<nameArray.length;i++){
                    if(text.startsWith(nameArray[i])) {
                        console.log("I found username "+nameArray[i]);
                        outputArray.push(nameArray[i]);
                        text = text.substring(nameArray[i].length);
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
        console.log(outputArray);
        console.log("It stopped");
        return(
            <>
                <h2 className="u-textCenter">Welcome, {!this.state.user ? "Anonymous" : this.state.user.name}</h2>
                {outputArray.map((value)=>{
                    if(nameArray.includes(value)){
                        return <span style={{color:"red"}}>{value}</span>;
                    } else {
                        return <span>{value}</span>;
                    }
                })}
               
                <hr></hr>
                <ProfileImage userId={this.props.userId} editing={this.state.editing}/>
                <ProfileBio userId={this.props.userId} editing={this.state.editing}/>
                <button 
                    type = "submit"
                    className = "Profile-edit u-pointer"
                    value = "Submit"
                    onClick={this.clickedEditing}
                    >Edit
                </button>
            </>
        );
    }
    return <h1>Loading!</h1>
}
*/