var express= require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


router.get("/",function(req, res){
    res.render("landing");
});

/////////============================
//////////AUTH ROUTES
/////////============================

//show register form
router.get("/register", function(req,res){
    res.render("register");
});
//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to Yelp Camp " + user.username);
           res.redirect("/campgrounds"); 
        });
    })
});
/// show log in form
router.get("/login", function(req, res){
    res.render("login");
});
/// handling login logic
router.post("/login",passport.authenticate("local", 
    {
        failureFlash: "Invaild username or password",
        successFlash: "Succesfully signed in",
        successRedirect: "/campgrounds",
        failureRedirect: "/login"

    }) ,function(req ,res){
});

//Log out 
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", " You succesfully logged out");
    res.redirect("/campgrounds");
});


/////

module.exports = router;