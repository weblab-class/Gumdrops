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

