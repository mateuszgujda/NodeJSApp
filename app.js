var express= require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v12";
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")
mongoose.Promise = global.Promise;
mongoose.connect(url, {useMongoClient: true});
//seedDB(); //seed the database

//Passport CONFIGURATION
app.use(require("express-session")({
    secret:"I want to break free",
    resave: false,
    saveUninitialized: false
}))
app.use(flash());
app.locals.moment = require("moment");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//SCHEMA SETUP

app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.get("/",function(req, res){
    res.render("landing");
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp server started!") 
});