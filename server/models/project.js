const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: String,
  collaborators: [
    {
      user : String,
      role: String,
    }
  ],
  stories : [String],
  commentsID : String,
},
{
  timestamps: true,
});

// compile model from schema
module.exports = mongoose.model("project", ProjectSchema);
