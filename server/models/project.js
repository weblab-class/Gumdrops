const mongoose = require("mongoose");

//Explanation of values:
//name: the name of the project
//collaborators: list of objects containing userId's and their rolename
//tags: tags associated with project

const ProjectSchema = new mongoose.Schema({
  name: String,
  views: Number,
  collaborators: [
    {
      userId : String,
      role: String, //stored without the @ sign
    }
  ],
  tags: [String], //stored WITH the # sign
},
{
  timestamps: true,
});

// compile model from schema
module.exports = mongoose.model("project", ProjectSchema);
