const mongoose = require("mongoose");

//Explanation of values:
//_id (implied): story id
// content: content of the story

const StoryCardSchema = new mongoose.Schema({
    content: String,
});

module.exports = mongoose.model("storycard",StoryCardSchema);