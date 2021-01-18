const mongoose = require("mongoose");

//Parameters
//userId : identifies the user
//image : the data for the image
//timestamps are included for later organization purposes

const ProfileImageSchema = new mongoose.Schema({
  userId: String,
  image: Buffer,
},
{
  timestamps: true,
});

// compile model from schema
module.exports = mongoose.model("image", ProfileImageSchema);

