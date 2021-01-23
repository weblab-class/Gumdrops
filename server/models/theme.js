const mongoose = require("mongoose");

//Stories the JSON.stringified Object representing user' theme data
const ThemeSchema = new mongoose.Schema({
  userId: String,
  themeData: Object,
},
{
  timestamps: true,
});

// compile model from schema
module.exports = mongoose.model("theme", ThemeSchema);

