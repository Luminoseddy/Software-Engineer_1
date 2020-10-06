var mongoose = require("mongoose");
var Book = require("./models/book");
var Comment = require("./models/comment");

var data = [
        // {
        //     image: "https://images-na.ssl-images-amazon.com/images/I/41GlJ-dGjoL._SX379_BO1,204,203,200_.jpg",
        //     name: "V1. Designing Software Synthesizer Plug-Ins in C++: For RackAFX, VST3, and Audio Units" ,
        //     author: "Will Pirkle", 
        //     bio: "He does what he likes",
        //     description: "Ain't nothing change everyday",
        //     genre: "Programming",
        //     publishedInfo: "IBZN0011",
        //     rating: "Off-Charts",
        //     // created: {type: Date, default: Date.now}
        // },
        
        // {
        //     image: "https://img1.wantitall.co.za/prodimages/the-audio-programming-book-mit-press__51tTzrQXi4L.jpg",
        //     name: "V2. Designing Software Synthesizer Plug-Ins in C++: For RackAFX, VST3, and Audio Units" ,
        //     author: "Will Pirkle", 
        //     bio: "He does what he likes",
        //     description: "Ain't nothing change everyday",
        //     genre: "Programming",
        //     publishedInfo: "IBZN0011",
        //     rating: "Off-Charts",
        //     // created: {type: Date, default: Date.now}
        // },
        
        // {
        //     image: "https://images.tandf.co.uk/common/jackets/amazon/978146656/9781466560284.jpg",
        //     name: "V3. Designing Software Synthesizer Plug-Ins in C++: For RackAFX, VST3, and Audio Units" ,
        //     author: "Will Pirkle", 
        //     bio: "He does what he likes",
        //     description: "Ain't nothing change everyday",
        //     genre: "Programming",
        //     publishedInfo: "IBZN0011",
        //     rating: "Off-Charts",
        //     // created: {type: Date, default: Date.now}
        // }
    ]




// This gets executed into the app.js class into seedDB();
// Wipes out the database
function seedDB(){
    // Book.remove({}, function(err){
    //     // console.log("remove books");
    //     if(err){
    //         console.log(err);
    //     }
        // console.log("removed books!");
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



 



