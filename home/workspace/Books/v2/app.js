var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose")

// connect to the db
mongoose.connect("mongodb://localhost/book_store");
app.use(bodyParser.urlencoded( { extended: true } ));
app.set("view engine", "ejs");




// Schema setup
var bookSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    genre: String,
    publishedInfo: String,
    rating: String
});


// this makes the model using the scehma above
var Book = mongoose.model("Book", bookSchema);

// Book.create(
//     {
//         image: "https://sdtimes.com/wp-content/uploads/2018/03/cpppp-490x490.png", 
//         name: "C++", 
//         description: "Master your skills in C++", 
//         genre: "", 
//         publisedInfo: "", 
//         rating: ""
//     }, 
//     function(err, book){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("New book created");
//             console.log(book);
//         }
//     });



// root path
app.get("/", function(req, res){
    res.render("landing");
});



/** Placing books after the slash on the link will call this, to 'get'.
    which gets and displays all the books **/
app.get("/books", function(req, res){
    // Get all books form db
    Book.find({}, function(err, allBooks){
        if(err){
               console.log(err);
        }else{
            res.render("index", {books: allBooks}); // index use to be books.ejs
        }
    });
});





// Post request, send to make new book request
app.post("/books", function(req, res){
    res.send("Testing: inside app.post request");
    // get data from form and add to books
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var genre = req.body.genre;
    var publishedInfo = req.body.publishedInfo;
    var rating = req.body.rating;
    
    var newBook = { image: image, 
                    name: name, 
                    description: description, 
                    genre: genre, 
                    publishedInfo: publishedInfo, 
                    rating: rating }
                    
    // Create/purchase a new book and save to 
    Book.create(newBook, function(err, newlyCreated){
        if(err){ // Error handling
            console.log(err);
        } else{
            res.redirect("/books"); // Back to main page
        }
    })
    // redirect back to books page
    res.redirect("/books");
});



// Shows the form that sends the data to the post route
app.get("/books/new",function(req, res){
    res.render("new.ejs");
});


// Shows more details about the book
app.get("/books/:id", function(req, res){
     // Find book with provided id, one id for uniqueness 
     Book.findById(req.params.id, function(err, foundBook){
         if(err){
             console.log(err);
         }else{
             // render show template with that campground.
             res.render("show", {book:foundBook});
         }
     // Show details of the book
    });
}) // closes app.get
 
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Bookstore has started...");
});