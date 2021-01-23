const mongoose = require("mongoose");

const RewardDataSchema = new mongoose.Schema({

  views: Integer, 
  projects: Integer,
  rewards:[],
  userId: String,
  streak:Integer,
  likes: Integer,


});
module.exports = mongoose.model("reward", RewardDataSchema);