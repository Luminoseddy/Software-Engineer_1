var mongoose = require("mongoose");
var Book = require("./models/book");
var Comment = require("./models/comment");

var data = []
    




// This gets executed into the app.js class into seedDB();
// Wipes out the database
function seedDB(){
    // Book.remove({}, function(err){
    //     console.log("remove books");
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("removed books!");
        // Add few books
        data.forEach(function(seed){
            Book.create(seed, function(err, book){
                if(err){
                    console.log(err);
                } else{
                    // console.log("added a book");
                    // Create a comment
                    Comment.create(
                        {
                            text: "_test_ ",
                            author: "Testing"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                book.comments.push(comment);
                                book.save();
                                console.log("New comment has been created")
                            }
                            
                        });
                }
            });
        // }); // This is with Book.remove({})
    });
// add few comments
}
module.exports = seedDB;



 



