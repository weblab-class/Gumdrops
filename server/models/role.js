const mongoose = require("mongoose");

//Defines the various styling attributes you can give to a role title

const RoleSchema = new mongoose.Schema({
    roleName: String,
    styling: {
        color: String,
        backgroundColor: String,
        backgroundImage: String,
        fontFamily: String,
        fontWeight: String,
        fontSize: String,
    },
});

// compile model from schema
module.exports = mongoose.model("role", RoleSchema);
