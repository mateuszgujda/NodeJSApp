var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   location: String,
   lat: Number,
   lng: Number,
   author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
      ],
   ratingAv: {type: Number , default: 0}
}); 

module.exports = mongoose.model("Campground", campgroundSchema);