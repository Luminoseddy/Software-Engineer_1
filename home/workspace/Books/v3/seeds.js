var mongoose = require("mongoose");
var Book = require("./models/book");

// wipe the database
Book.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed books!");
})