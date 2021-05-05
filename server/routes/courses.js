var express = require('express');
const { update } = require('../models/Course');
var router = express.Router();

var Course=require("../models/Course");


router.get("/",async(req,res)=>{
    
    try{
        var allCourse = await Course.find().populate('course');
        res.json(allCourse);
    } catch (err) {
        res.json({ message: err });
    }

})

router.post("/",async(req,res)=>{
    var course = req.body;
    var newCourse = new Course(course);

    try{
        var savedCourse = await newCourse.save();
        res.json(savedCourse);
    } catch (err) {
        res.json({ message: err });
    }

});

router.patch("/", async(req, res) =>{

    var course=req.body;
    var idToUpdate=course._id;
    try
    {
        var courseToUpdate=await Course.findOne({_id:idToUpdate});

        if(courseToUpdate)
        {
            let newTeacherField=course.Teacher;
            let updatedCourse=await courseToUpdate.updateOne({"Teacher": newTeacherField});
            res.json(updatedCourse);
        }
        else
        {
            console.log("Unable to patch");
            res.json({message:"Unable to patch"});
        }
    }
    catch(err)
    {
        res.json({message:err});
    }
})


module.exports = router;