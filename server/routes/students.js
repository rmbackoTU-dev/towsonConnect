var express = require('express');
var router = express.Router();

var Student=require("../models/Student");

//Required for Upload
var Teacher=require("../models/Teacher");
var cloudinary = require('cloudinary').v2;
var PDFImage = require("pdf-image").PDFImage;
var fs = require('fs');

cloudinary.config({ 
    cloud_name: 'dfpxuz5t9', 
    api_key: '637824442584946', 
    api_secret: 'pYiibYNkh6iBZEUXjJnvX0DGjds' 
  });
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
//End of upload config


router.get("/",async(req,res)=>{
    
    try{
        // Will get all courses the Student has 
        var allStudent = await Student.find()
        res.json(allStudent);
    } catch (err) {
        res.json({ message: err });
    }

});

// Upload endpoint
router.post("/upload",multipartMiddleware,async(req,res)=>{
   
    let teacherId=req.body.teacher;
    let student=req.body.student;
    let course=req.body.course;
   
if(req.files.document.type.split("/")[0]==="image")
    {
        cloudinary.uploader.upload(req.files.document.path, async function(error, result) {
            if(error) res.json(error);
           let updateResponse=await Teacher.updateOne({_id:teacherId},{$addToSet:{studentFiles:{course,student,fileUrl:result.url}}})
           fs.unlink(req.files.document.path,()=>{
            res.json({message:"File Uploaded" ,url:result.url})


           });
 });
    }
    else{
        res.json({message:"File type Not supported only  images are allowed"})
    }
});
//end of upload endpoint

router.get("/:studentid",async(req,res)=>{
    
    try{
        // Will get all courses the Student has 
        console.log("GOT "+req.params.studentid);
        var student = await Student.findOne({userId:req.params.studentid }).populate('course');
        res.json(student);
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