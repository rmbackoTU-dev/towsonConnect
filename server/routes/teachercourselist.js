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

});

router.get("/:teacherid",async(req,res)=>{
    
    try{
        // Will get all courses the Student has 
        var student = await Teacher.findOne({userId:req.params.teacherid }).populate('course');
        console.log("Sending :"+JSON.stringify(student));
        res.json(student);
    } catch (err) {
        res.json({ message: err });
    }

});

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
        console.log("Sent: "+JSON.stringify(savedTeacher));
    } catch (err) {
        res.json({ message: err });
    }

})

module.exports = router;