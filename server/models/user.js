const mongoose = require("mongoose");

//Explanation of values:
//name is username
//googleid is GoogleID
//projectIds is a String array that holds all the ProjectIds that they are in
//teamIds is a String array that holds all the TeamIds that they are in

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  projectIds: [String],
  teamIds: [String]
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
