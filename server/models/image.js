const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  projectId : String,
  image: Buffer,

},
{
  timestamps: true,
});

// compile model from schema
module.exports = mongoose.model("image", ImageSchema);

