var express = require('express');
var router = express.Router();

//Import User model
var User = require('../models/User');
//imports Notification Model
var Notification = require('../models/Notification');



/**
 * Notification end points by user
 */
router.get('/user/:userId', async (req, res) => {
    try{
        var user = await User.findById(req.params.userId);
        var notificationsForUser = await Notification.find({ 'access_token': user.access_token });
        res.status(200).json(notificationsForUser);
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
        access_token: requestBody.access_token,
        short_descript: requestBody.short_descript,
        long_descript: requestBody.long_descript,
        hyperlink: requestBody.hyperlink,
        header: requestBody.header
    };
    var newNotification = new Notification(notificationData);

    try{
        var saved = await newNotification.save();
        var successMessage = "Success: " + JSON.stringify(newNotification);
        res.status(200).json(newNotification);
    }
    catch(err){
        res.status(403).json({ message: err });
    }
});


module.exports = router;