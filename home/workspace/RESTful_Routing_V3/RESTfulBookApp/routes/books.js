// var express = require("express");
// var router  = express.Router();
// var Book = require("../models/book");

// //INDEX - show all book
// router.get("/", function(req, res){
//     // Get all book from DB
//     Book.find({}, function(err, allBooks){
//       if(err){
//           console.log(err);
//       } else {
//           res.render("books/index",{books:allBooks});
//       }
//     });
// });

// //CREATE - add new bookto DB
// router.post("/", function(req, res){
//     // get data from form and add to campgrounds array
//     var name = req.body.name;
//     var image = req.body.image;
//     var desc = req.body.description;
//     var newBook = {name: name, image: image, description: desc}
//     // Create a new book and save to DB
//     Book.create(newBook, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to book page
//             res.redirect("/books");
//         }
//     });
// });

// //NEW - show form to create new book
// router.get("/new", function(req, res){
//   res.render("books/new"); 
// });

// // SHOW - shows more info about one book
// router.get("/:id", function(req, res){
//     //find the book with provided ID
//     Book.findById(req.params.id).populate("comments").exec(function(err, foundBook){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundBook)
//             //render show template with that book
//             res.render("books/show", {campground: foundBook});
//         }
//     });
// });

// module.exports = router;

