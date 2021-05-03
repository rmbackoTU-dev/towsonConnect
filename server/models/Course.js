var mongoose = require('mongoose');

const Course = mongoose.model('Course', new mongoose.Schema({
    courseName: String,
    subjectDesignator:String,
    courseNum:Number

    
}));

module.exports= Course;