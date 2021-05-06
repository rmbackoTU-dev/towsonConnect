var mongoose = require('mongoose');

//define Thread schema for Mongoose operations
var ThreadSchema = mongoose.Schema({
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: ''
    },
    message_ids: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    creator_type: {
        type: String,
        default: ''
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Threads', ThreadSchema);