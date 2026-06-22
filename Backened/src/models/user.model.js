const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    username : {
        type : String,
        unique : [true, "username already taken"],
        required : true,
         minlength: [4, "username must be at least 4 characters"],
        maxlength: [13, "username must be less than 13 characters"],
        match: [/^[a-zA-Z0-9_]+$/, "username can only contain letters, numbers, and underscores"]
    },

    email : {
        type : String,
        unique : [true , "Account already exists with thsi email"],
        required : true,
        match: [/^\S+@\S+\.\S+$/, "please enter a valid email"]
    },
    password : {
        type : String,
        required : true,

    }

})



const userModel = mongoose.model("users", userSchema)

module.exports = userModel

