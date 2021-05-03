var express = require('express');
var router = express.Router();

var Student=require("../models/Student");


router.get("/",async(req,res)=>{
    
    try{
        // Will get all courses the Student has 
        var allStudent = await Student.find().populate('course');
        res.json(allStudent);
    } catch (err) {
        res.json({ message: err });
    }

})

router.post("/",async(req,res)=>{
    var userId = req.body.userId;
    var course=req.body.course.split(",");
    var newStudent = new Student({
      userId,
      course
    });

    try{
        var savedStudent = await newStudent.save();
        res.json(savedStudent);
    } catch (err) {
        res.json({ message: err });
    }

})

module.exports = router;