var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
 {name: "Cloud's Rest", 
 image: "https://source.unsplash.com/gcCcIy6Fc_M",
 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae vestibulum tortor, eu placerat arcu. Praesent rhoncus est eu commodo tincidunt. Maecenas sed eros vulputate, bibendum arcu vel, pharetra ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer mauris lectus, euismod quis nisi at, vestibulum egestas lorem. Donec neque ipsum, vulputate sit amet vulputate sed, rhoncus vitae enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id porttitor dolor, at semper metus. Duis faucibus arcu a odio blandit, quis tristique nisi tincidunt. In porta risus eget metus fringilla scelerisque. Fusce tempus egestas risus. In rutrum felis in lorem sollicitudin, eget aliquet diam dignissim. Vivamus vitae mattis ipsum, in congue diam. Aenean sollicitudin tellus nec purus aliquam rhoncus. "   
 }, 
 {name: "Desert Mesa", 
 image: "https://source.unsplash.com/3fJOXw1RbPo",
 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae vestibulum tortor, eu placerat arcu. Praesent rhoncus est eu commodo tincidunt. Maecenas sed eros vulputate, bibendum arcu vel, pharetra ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer mauris lectus, euismod quis nisi at, vestibulum egestas lorem. Donec neque ipsum, vulputate sit amet vulputate sed, rhoncus vitae enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id porttitor dolor, at semper metus. Duis faucibus arcu a odio blandit, quis tristique nisi tincidunt. In porta risus eget metus fringilla scelerisque. Fusce tempus egestas risus. In rutrum felis in lorem sollicitudin, eget aliquet diam dignissim. Vivamus vitae mattis ipsum, in congue diam. Aenean sollicitudin tellus nec purus aliquam rhoncus. "   
 },
 {name: "Canyon Floor", 
 image: "https://source.unsplash.com/IejSZKGu1mY",
 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae vestibulum tortor, eu placerat arcu. Praesent rhoncus est eu commodo tincidunt. Maecenas sed eros vulputate, bibendum arcu vel, pharetra ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer mauris lectus, euismod quis nisi at, vestibulum egestas lorem. Donec neque ipsum, vulputate sit amet vulputate sed, rhoncus vitae enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id porttitor dolor, at semper metus. Duis faucibus arcu a odio blandit, quis tristique nisi tincidunt. In porta risus eget metus fringilla scelerisque. Fusce tempus egestas risus. In rutrum felis in lorem sollicitudin, eget aliquet diam dignissim. Vivamus vitae mattis ipsum, in congue diam. Aenean sollicitudin tellus nec purus aliquam rhoncus. "   
 }

];
function seedDB(){
//Remove all campgrounds
Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
  console.log("Campgrounds removed");
    //add a few capmgrounds
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else{
                console.log("added campground");
                //create a comment on each campground
                Comment.create({text: "This place is great, but I wish there was Internet",
                                author: "Homer"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else{
                    campground.comments.push(comment);
                    campground.save();
                    console.log("Created new comment");
                    }
                });
            }
        
             }); 
        }); 
    }); 
};

    module.exports = seedDB;