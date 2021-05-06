var mongoose = require('mongoose');
const dotenv=require("dotenv");



// The purpose of this script is to clean out the courses
//teachers and users table at the end of a test

//import necessary model
var courses= require('./models/Course');

dotenv.config();

var options = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(process.env.DB_CONNECTION, options)
    .then( async () => {
        console.log('Successfully connected to the database');
        //Issue clean commands

        //loop courses and remove teachers from courses
        var updateCourse=await courses.updateMany({},
         {
            $set:{
            "Teacher":null
            }
         });
         console.log(updateCourse);

         mongoose.disconnect();
        
    }).catch(err => console.error(err)
);

