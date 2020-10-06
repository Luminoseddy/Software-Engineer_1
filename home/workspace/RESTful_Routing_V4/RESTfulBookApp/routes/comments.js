// var express = require("express");
// var router  = express.Router({mergeParams: true});
// var Book= require("../models/book");
// var Comment = require("../models/comment");

// //Comments New
// router.get("/new", isLoggedIn, function(req, res){
//     // find book by id
//     console.log(req.params.id);
//     Book.findById(req.params.id, function(err, book){
//         if(err){
//             console.log(err);
//         } else {
//              res.render("books/new", {book: book});
//         }
//     })
// });

// //Comments Create
// router.post("/",isLoggedIn,function(req, res){
//   //lookup book using ID
//   Book.findById(req.params.id, function(err, book){
//       if(err){
//           console.log(err);
//           res.redirect("/books");
//       } else {
//         Comment.create(req.body.comment, function(err, comment){
//           if(err){
//               console.log(err);
//           } else {
//               book.comments.push(comment);
//               book.save();
//               res.redirect('/books/' + book._id);
//           }
//         });
//       }
//   });
// });

// //middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }


// module.exports = router;