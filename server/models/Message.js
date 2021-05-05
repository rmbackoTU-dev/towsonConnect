var mongoose = require('mongoose');

//define Message schema for Mongoose operations
var MessageSchema = mongoose.Schema({
    author_id: mongoose.Schema.Types.ObjectId,
    description: String,
    count: {
        type: Number,
        default: 0
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    children_ids: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [] 
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Messages', MessageSchema);