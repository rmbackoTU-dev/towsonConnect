var mongoose = require('mongoose');

const Teacher = mongoose.model('Teacher', new mongoose.Schema({
   // Will be coming from the users collection
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    course:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
}));

module.exports= Teacher;