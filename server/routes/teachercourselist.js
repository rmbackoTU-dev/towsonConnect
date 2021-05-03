var express = require('express');
var router = express.Router();

var Teacher=require("../models/Teacher");


router.get("/",async(req,res)=>{
    
    try{
        // Will get all courses the teacher has 
        var allTeacher = await Teacher.find().populate('course');
        res.json(allTeacher);
    } catch (err) {
        res.json({ message: err });
    }

})

router.post("/",async(req,res)=>{

    var userId = req.body.userId;
    var course=req.body.course.split(",");
    var newTeacher = new Teacher({
        userId,
        course
      });

    try{
        var savedTeacher = await newTeacher.save();
        res.json(savedTeacher);
    } catch (err) {
        res.json({ message: err });
    }

})

module.exports = router;