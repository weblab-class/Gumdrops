const mongoose = require("mongoose");

//Explanation of values:
//_id (implied): story id
// content: content of the story

const StoryCardSchema = new mongoose.Schema({
    projectId: String,
    textTitle: String,
    textContent: String,
    links: [String],
    videoMedia: String,
    imageMedia: Buffer,
    imageHeader: String, //used to recreate image original URL-encoded data
});

module.exports = mongoose.model("storycard",StoryCardSchema);