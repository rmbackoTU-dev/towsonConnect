var mongoose = require('mongoose');

//define Thread schema for Mongoose operations
var ThreadSchema = mongoose.Schema({
    creator_id: mongoose.Schema.Types.ObjectId,
    message_ids: [mongoose.Schema.Types.ObjectId],
    description: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Threads', ThreadSchema);