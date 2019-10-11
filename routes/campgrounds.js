
var express= require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require('geocoder');


////////////=====================
///////////Campground Routes
//////////====================


//INDEX - show a list of all campgrounds
router.get("/campgrounds",function(req, res){
    
    //Get all campgrounds from DB 
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    })
   
});
//Create - add new campground to DB
router.post("/campgrounds",middleware.isLoggedIn,function(req, res){
   var name= req.body.name;
   var image= req.body.image;
   var price = req.body.price;
   var desc = req.body.description;  
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   geocoder.geocode(req.body.location, function(err, data){
    if(err){
        console.log(err);
    }
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newCampground={name: name, image: image, description: desc, author: author, price: price, location: location, lat: lat, lng: lng};
   //get data from form and add to campgrounds array
   //Create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else{
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
       }
   }) 
   });
});
//NEW - show a form to create new campground
router.get("/campgrounds/new",middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else
       {
           console.log(foundCampground);
           //render the template
           
           res.render("campgrounds/show.ejs",{campground: foundCampground});
       }
    });
});


 
// EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req, res){

            Campground.findById(req.params.id, function(err, foundCampground){
                            if(err){
                 req.flash("Campground not found");
            }
             res.render("campgrounds/edit", {campground: foundCampground}); 
});
});
// UPDATE CAMPGROUND ROUTE

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.price, location: location, lat: lat, lng: lng};
    if(err){
        console.log(err);
    }
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
        });
     
 }) ;
});

//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground deleted");
            res.redirect("/campgrounds");
        }
    })
});




module.exports = router;