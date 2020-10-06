var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book_demo");

// Post - title, content -> Declaring the schema
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);



// Models: User - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema] // Must be the name of the schema
});
var User = mongoose.model("User", userSchema);


var newUser = new User({
    email: "amanda1999@fiu.edu",
    name: "Amanda Fernandez"
});


// Pushes the post into the new user, and then it saves.
newUser.posts.push({
   title: "Pero que cosa es esto?!",
   content:" Eso es una perra"
});



newUser.save(function(err, user){
    if(err){
        console.log(err);
    } else{
        console.log(user);
    }
});

// var newPost = new Post({
//     title: "Apple vs Android",
//     content: "Its obviouse homie"
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(post);
//     }
// });



User.findOne({name: "Amanda Fernandez"}, function(err, user){
    if(err){
        console.log(err);
    } else{
        user.posts.push({
            title: "The things I love about you",
            content: "Words can't even describe it"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
             } else{
                 console.log(user);
             }
        });
    }
});




