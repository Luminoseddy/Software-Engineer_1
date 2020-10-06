// Modulizing the code into small pieces
var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({ // Declaring schema
    title: String,
    content: String
});

// Decalring models
module.exports = mongoose.model("Post", postSchema);