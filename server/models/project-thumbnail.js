const mongoose = require("mongoose");

//Parameters
//projectId : identifies the project it is in
//cardId: identifies the specific card in a project it links to
//timestamps are included for later organization purposes

const ProjectThumbnailSchema = new mongoose.Schema({
  projectId : String,
  image: Buffer,
  imageName: String,
});

// compile model from schema
module.exports = mongoose.model("ProjectThumbnail", ProjectThumbnailSchema);

