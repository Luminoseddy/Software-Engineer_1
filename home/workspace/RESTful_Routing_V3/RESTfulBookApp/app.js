// Version 3

var bodyParser       = require("body-parser"),
    methodOverride   = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose         = require ("mongoose"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    express          = require("express"),
    app              = express(),
    Book             = require("./models/book"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    seedDB           = require("./seeds"),
//requring routes
    commentRoutes    = require("./routes/comments"),
    bookRoutes       = require("./routes/books"),
    indexRoutes      = require("./routes/index");
    
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

// Passport configuration
app.use(require("express-session")({
    secret: "Testing new passport",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){ // middle-ware that runs in every single route
    res.locals.currentUser = req.user;
    next();
});

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


app.get("/", function(req, res){
    res.redirect("/books");
});

// INDEX ROUTE
app.get("/books", function(req, res){
    // Retrieve all books from database
    Book.find({}, function(err, allBooks){
        if(err){
            console.log("Error-Negative!");
        } else{
            res.render("books/index", {books: allBooks, currentUser: req.user});
        }
    });
});


// NEW ROUTE
// isLoggedIn checks if the user is logged in before purchasing a new book.
app.get("/books/new", isLoggedIn, function(req, res){
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

// isLoggedIn is needed for both get and post
// This is how we directly find a specific id to update
// Edit route
app.get("/books/:id/edit", isLoggedIn, function(req, res){
    Book.findById(req.params.id, function(err, foundBook){
        if(err){
            res.redirect("/books");
        }else{
            res.render("edit", {book: foundBook});
        }
    });
});
//Update ROUTE
app.put("/books/:id", isLoggedIn, function(req, res){
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


// Must be logged in to update a comment, hence use  isLoggedIn for get and post.
// Comments route
app.get("/books/:id/comments/new", isLoggedIn, function(req, res){
    // find book by id
    Book.findById(req.params.id, function(err, book){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {book: book});
        }
    });
});
app.post("/books/:id/comments", isLoggedIn, function(req, res){
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



//  ===========
// AUTH ROUTES
//  ===========

// show register form
app.get("/register", function(req, res){
  res.render("register"); 
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
          res.redirect("/books"); 
        });
    });
});

// show login form
app.get("/login", function(req, res){
  res.render("login"); 
});
// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/books",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/books");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


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
