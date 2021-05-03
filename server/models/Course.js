var mongoose = require('mongoose');

const Course = mongoose.model('Course', new mongoose.Schema({
    courseName: String,
    subjectDesignator:String,
    courseNum:Number,
    Teacher: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
        }
    ]

    
}));



module.exports= Course;