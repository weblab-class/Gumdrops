const mongoose = require("mongoose");

const RewardDataSchema = new mongoose.Schema({

  views: Number, 
  projects: Number,
  rewards:[String],
  userId: String,
  streak: Number,
  likes: Number,
  journal: Number,
  storycard: Number,
  
});
module.exports = mongoose.model("reward", RewardDataSchema);