//Place to put code that you have used to intialize hard-coded data on MongoDB
//This is for archiving purposes only

//location: api.js in get("/projects").
const Project = require("./models/project");
let project1 = new Project({
    name: "Weekly Projects #1",
    collaborators: [
      {
        userId: "60024cc4bdc8da271ed50f0f",
        role:"magic wand"
      }
      ,{
        userId: "60025fac44a0c93344e6a28d",
        role: "dragonator"
      }
      ,{
        userId: "6002848932976068eca6a53d",
        role: "king"
      }
    ],
  });
  project1.save();


//Usage: Test the functionality of GET and POST at /api/storycards
//location App.js
//in handleLogin() 
const newStoryCard = {
  projectId: "6002597bb45b7733b322e9ad",
  textTitle: "This is the start of my project!",
  textContent: "Welcome. My name is Miami and this is my amazing adventure...",
  links: ["https://www.google.com","https://www.youtube.com"],
  videoMedia: "https://www.youtube.com/watch?v=Ff0wYvW2JKs"
};
post("/api/storycards",newStoryCard);
//in handleLogout()
get("/api/storycards",{projectId:"6002597bb45b7733b322e9ad"}).then((storycards)=>console.log(storycards));


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