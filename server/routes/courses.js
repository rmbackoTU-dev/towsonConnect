var express = require('express');
const { update } = require('../models/Course');
var router = express.Router();

var Course=require("../models/Course");


router.get("/",async(req,res)=>{
    
    try{
        var allCourse = await Course.find();
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

})


module.exports = router;