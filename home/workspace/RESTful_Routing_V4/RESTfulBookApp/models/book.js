var mongoose = require("mongoose");

// Schema setup; MONGOO/MODEL/CONFIG
// To run type: mongo >> use restful_book_app >> db.books.find() 
var bookSchema = new mongoose.Schema({
    image: String,
    name: String,
    author: String, 
    bio: String,
    description: String,
    genre: String,
    publishedInfo: String,
    rating: String,
    created: {type: Date, default: Date.now},
    
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Book", bookSchema);