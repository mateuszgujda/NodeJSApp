var mongoose = require("mongoose");
var passportLocalMongose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    rating: [{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campground"
        },
        value:{
            type: Number,
            default: 0
        }
    }]
});

UserSchema.plugin(passportLocalMongose);

module.exports = mongoose.model("User", UserSchema);