const mongoose = require("mongoose");

//Parameters
//userId : identifies the user
//content : the content of the user's bio
//timestamps are included for later organization purposes

const ProfileBioSchema = new mongoose.Schema({
    userId: String,
    content: String,
    /*roles: [String]*/
},
{
  timestamps: true,
});

// compile model from schema
module.exports = mongoose.model("profile", ProfileBioSchema);