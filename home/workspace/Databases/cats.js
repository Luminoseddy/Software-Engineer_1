/* This is for testing the monogoDB purposes */

var mongoose = require("mongoose");

// Path that connects to the database
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// "Cat" singular version the collection name
var Cat = mongoose.model("Cat", catSchema);

// Interacting with the db
// // adding a new object into the DB
// var Amanda = new Cat({
//     name: "Amanda",
//     age: 19,
//     temperament: "She's perfect! <3"
// });

// // error and the item returned, cat
// Amanda.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong!")
//     }else{
//         console.log("We just saved your data")
//         console.log(cat) // this refers what came back form the database
//     }
// });


// retrieve all the cats from the DB and console.log each for checking
Cat.create({
    name: "Snow white",
    age: 19,
    temperament: "Blonde"
}, function(err, cat){
    if(err){
        console.log(err);
    }else {
        console.log(cat)
    }
});


// Find method
Cat.find({}, function(err, cats){
    if(err){
        console.log("Damn.. Theres an error!");
    }else{
        console.log("All the cats..");
        console.log(cats);
    }
});





