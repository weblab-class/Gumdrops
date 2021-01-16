//Place to put code that you have used to intialize hard-coded data on MongoDB
//This is for archiving purposes only

//location: api.js in get("/projects").
const Project = require("./models/project");
let project1 = new Project({
    name: "Weekly Projects #1",
    collaborators: [
      {
        userId: "thisisacollab1",
        role:"magic wand"
      }
      ,{
        userId: "thisisacollab2",
        role: "dragonator"
      }],
  });
  project1.save();
