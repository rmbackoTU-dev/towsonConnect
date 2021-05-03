var mongoose = require('mongoose');

const Student = mongoose.model('Student', new mongoose.Schema({
   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    course:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
}));

module.exports= Student;