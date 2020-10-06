// Version 2

var bodyParser       = require("body-parser"),
    methodOverride   = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose         = require ("mongoose"),
    express          = require("express"),
    app              = express(),
    Book             = require("./models/book"),
    Comment          = require("./models/comment"),
    seedDB           = require("./seeds");
    
// Set up mongoose: title; image; body; dateCreated
// Must insert {useNewUrlParser: true} at the end for: versions > 3.1
mongoose.connect("mongodb://localhost/restful_book_app", ({useNewUrlParser: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); // This must be after bodyParser or else it won't work
app.use(methodOverride("_method")); // Looks for _method as parameter.

seedDB();

// Schema setup; MONGOO/MODEL/CONFIG
// To run type: mongo >> use restful_book_app >> db.books.find() 
// var bookSchema = new mongoose.Schema({
//     image: String,
//     name: String,
//     author: String, 
//     bio: String,
//     description: String,
//     genre: String,
//     publishedInfo: String,
//     rating: String,
//     created: {type: Date, default: Date.now}
// });
// var Book = mongoose.model("Book", bookSchema);

// INDEX ROUTE
app.get("/books", function(req, res){
    // Retrieve all books from database
    Book.find({}, function(err, allBooks){
        if(err){
            console.log("Error-Negative!");
        } else{
            res.render("books/index", {books: allBooks});
        }
    });
});


// NEW ROUTE
app.get("/books/new", function(req, res){
    res.render("books/new"); // renders the the same form every time
});



// CREATE ROUTE
app.post("/books", function(req, res){
    //req.body is whatever is coming from the form, whatever data is in req body
    req.body.book.body = req.sanitize(req.body.book.body);
    // Creating the blog, the data is req.body.book
    Book.create(req.body.book, function(err, newBook){
       if(err){
           res.render("new");
       } else{
           res.redirect("/books");
       }
    });
});


// SHOW ROUTE
app.get("/books/:id", function(req, res){
    // Testing
    // res.send("SHOW ROUTE's link page."); 
    
    Book.findById(req.params.id).populate("comments").exec(function(err, foundBook){
        if(err){
            res.redirect("/books");
        }else{
            // render show template with that book
            res.render("books/show", {book: foundBook});
        }
    });
});

// This is how we directly find a specific id to update
// Edit route
app.get("/books/:id/edit", function(req, res){
    Book.findById(req.params.id, function(err, foundBook){
        if(err){
            res.redirect("/books");
        }else{
            res.render("edit", {book: foundBook});
        }
    });
});


//Update ROUTE
app.put("/books/:id", function(req, res){
    // res.send("TESTING: UPDATE ROUTE!" );
    req.body.book.body = req.sanitize(req.body.book.body);
    Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, updatedBook){
        if(err){
            res.redirect("/books");
        }else{
            res.redirect("/books/" + req.params.id);
        }
    });
});


// DELETE ROUTE
// could still work as app.Anything
app.delete("/books/:id", function(req, res){
    // res.send("We have succesfully deleted the book.");
    // destroy the book
    Book.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/books");
        }else{
            res.redirect("/books");
        }
    });
});




// Comments route
app.get("/books/:id/comments/new", function(req, res){
    // find book by id
    Book.findById(req.params.id, function(err, book){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {book: book});
        }
    });
});

app.post("/books/:id/comments", function(req, res){
    // lookup book using id
    Book.findById(req.params.id, function(err, book){
        if(err){
            console.log(err);
            res.redirect("/books");
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else {
                    // associate comment to the book
                    book.comments.push(comment); // comment from database we created
                    book.save();
                    res.redirect("/books/" + book._id);
                }
            });
            
        }
    });
    // create new comment
    // connect new comment to the book
    // redirect it to show page.
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is up and running...");
});




// Testing
// Book.create({
//     image: "https://www.cbronline.com/wp-content/uploads/2016/07/C.png",
//     name: "TESTING C++",
//     description: "TEACH YOURSELF IN 24 HOURS, LEARN C++",
//     genre: "PROGRAMMING",
//     publishedInfo: "Que se yoo aseerreeee ",
//     rating: "TopNotch papo"
// })
