var mongoose = require('mongoose');
var roles=require('./Role');

//define User scehma for Mongoose operations
var UserSchema = mongoose.Schema({
    fname: String,
    lname: String,
    age: Number, 
    role:{type: mongoose.Schema.Types.ObjectId, ref:'Role'},
    access_token: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('User', UserSchema);