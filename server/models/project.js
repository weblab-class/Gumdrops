const mongoose = require("mongoose");

//Explanation of values:
//name: the name of the project
//collaborators: list of objects containing userId's and their rolename

const ProjectSchema = new mongoose.Schema({
  name: String,
  collaborators: [
    {
      userId : String,
      role: String,
    }
  ],
},
{
  timestamps: true,
});

// compile model from schema
module.exports = mongoose.model("project", ProjectSchema);
