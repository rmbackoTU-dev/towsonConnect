var mongoose = require('mongoose');

//define User scehma for Mongoose operations
var UserSchema = mongoose.Schema({
    fname: String,
    lname: String,
    age: Number, 
    created_at: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Users', UserSchema);