const mongoose = require("mongoose");

//Parameters
//projectId : identifies the project it is in
//cardId: identifies the specific card in a project it links to
//timestamps are included for later organization purposes

const ImageSchema = new mongoose.Schema({
  projectId : String,
  cardId : String,
  image: Buffer,
  imageName: String,
},
{
  timestamps: true,
});

// compile model from schema
module.exports = mongoose.model("image", ImageSchema);

