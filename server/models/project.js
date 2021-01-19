const mongoose = require("mongoose");

//Explanation of values:
//name: the name of the project
//collaborators: list of objects containing userId's and their rolename
//stories: a list of the storyCard ids associated with the project
//commentsID: the id of the comments section associated with the project

const ProjectSchema = new mongoose.Schema({
  name: String,
  collaborators: [
    {
      userId : String,
      role: String, //stored without the @ sign
    }
  ],
  teamId: String, 
  tags: [String], //stored WITH the # sign
},
{
  timestamps: true,
});

// compile model from schema
module.exports = mongoose.model("project", ProjectSchema);
