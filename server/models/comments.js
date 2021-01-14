const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  projectId: String,
  comments : {
      user: String,
      content: String,
  },
},
{
  timestamps: true,
});

// compile model from schema
module.exports = mongoose.model("comments", CommentsSchema);

