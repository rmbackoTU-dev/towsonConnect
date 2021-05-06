var express = require('express');
var router = express.Router();

//imports Notification Model
var Notification = require('../models/Notification');

/**
 * Get all notifications for a given courseId
 * 
 */
router.get('/course/:courseId', async (req, res) => {
    try{
        console.log("Hit course notification End point");
        let courseId=req.params.courseId;
        console.log(courseId);
        var notifications = await Notification.find({course:courseId});
        console.log(JSON.stringify(notifications));
        for(let i=0; i<notifications.length; i++)
        {
            console.log("Got "+JSON.stringify(notifications[i]));
        }
        res.status(200).json(notifications);
    }
    catch(err){
        res.status(403).json({ message: err });
    }
});

/**
  * Post a Notification 
  */
router.post('/', async (req, res) => {
    let requestBody = req.body;
    var notificationData = {
        short_descript: requestBody.short_descript,
        long_descript: requestBody.long_descript,
        hyperlink: requestBody.hyperlink,
        header: requestBody.header,
        type: requestBody.type,
        course: requestBody.course
    };
    var newNotification = new Notification(notificationData);
    console.log(newNotification.long_descript);
    console.log(newNotification.short_descript);
    try{
        var saved = await newNotification.save();
        var successMessage = "Success: " + JSON.stringify(newNotification);
        console.log(successMessage);
        res.status(200).json(newNotification);
    }
    catch(err){
        res.status(403).json({ message: err });
    }
});


module.exports = router;