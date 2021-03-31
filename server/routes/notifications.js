var express = require('express');
var router=express.Router();

//Import User model
var User=require('../models/User');
//imports Notification Model
var Notification=require('../models/Notification');
//imports Roles model
var Role=require=require('../models/Role');


/**
 * Notification end points by user
 */
router.get('/user/:userid', async (req, res) => 
{
    var user=User.findById(req.params.userid,  async (err, user) =>
    {
        if(err)
        {
            res.status(403).json({message:err});
        }
        else
        {
            //only get notification for that users access token
            var notificationsForUser= await Notification.find({'access_token': user.access_token}).exec();
            res.status(200).json(notificationsForUser);
        }
    });

});

/**
 * Notification end points by role
 */
 router.get('/role/:roleid', async(req, res) => 
 {
     var role=Role.findById(req.params.roleid, async(err, role) =>
     {
         if(err)
         {
             res.status(403).json({message:err});
         }
         else
         {
             console.log(role);
             //only get notification for that users access token
             var notificationsForUser= await Notification.find({'access_token': role.access_token}).exec();
             res.status(200).json(notificationsForUser);
         }
     });
 
 });


 /**
  * Post a Notification 
  */
 router.post('/', async(req,res) =>
 {
    let requestBody=req.body;
    var notificationData= {
        access_token:requestBody.access_token,
        short_descript: requestBody.short_descript,
        long_descript: requestBody.long_descript,
        hyperlink:requestBody.hyperlink,
        header: requestBody.header
    };
    var newNotification=new Notification(notificationData);

    try
    {
        var saved=newNotification.save();
        var successMessage="Sucess: "+JSON.stringify(newNotification);
        res.json(newNotification);
    }
    catch(err)
    {
        res.status(403).json({message:err});
    }
 });

 module.exports=router;