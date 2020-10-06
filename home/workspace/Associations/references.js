var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book_demo_2", ({useNewUrlParser: true}));

var Post = require("./models/post");
var User = require("./models/user");

User.remove({}, function() {
    Post.remove({}, function() {
        User.create({
            email: "eddx540@gmail.com",
            name: "Edward Palermo"
        }, function(err, user) {
            if(err) {
                console.log(err);
            } else {
                User.findOne({email: "eddx540@gmail.com"}).populate("posts").exec(function(err, foundUser){
                    if(err) {
                        console.log(err);
                    }else{
                        console.log(foundUser);
                        Post.create({
                            title: "How to cook the best arroz con pollo like a true balsera Pt4 in miami",
                            content: "MUCH0 AzUUUUcacaaaaaar"
                        },function(err, post){
                                User.findOne({email: "eddx540@gmail.com"}, function(err, foundUser){
                                    if(err){
                                        console.log(err);
                                    }else{
                                        foundUser.posts.push(post);
                                        foundUser.save(function(err, data){
                                            if(err){
                                                console.log(err);
                                            }else{
                                                console.log(data);
                                            }
                                        });
                                    }
                                });
                        });
                    }
                });
            }
        });
    });
});

// Finding user, chaining populate with posts, then looks in the posts array. and then execute everything
// User.findOne({email: "eddx540@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });


// Find user

//Find all posts for that user


// User.Create({
//     email: "amandaF1999@gmail.com",
//     name: "Amandas Fernandez"
// });





