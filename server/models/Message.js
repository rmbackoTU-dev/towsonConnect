var mongoose = require('mongoose');

//define Message schema for Mongoose operations
var MessageSchema = mongoose.Schema({
    author_id: mongoose.Schema.Types.ObjectId,
    description: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Messages', MessageSchema);