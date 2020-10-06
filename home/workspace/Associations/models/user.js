var mongoose = require("mongoose");

// Models
// User - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [ // Array of object id', from mongoDB ID , and passed into post
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]
});

// Decalring models
module.exports = mongoose.model("User", userSchema);


