var express = require('express');
var request=require('request');
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
router.get('/:userid', async(req, res) => 
{
    var user=User.findById(req.params.userid, (err, user) =>
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
 router.get('/:roleid', async(req, res) => 
 {
     var user=Role.findById(req.params.roleid, (err, user) =>
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
  * Post a Notification 
  */
 router.get('/', async(req,res) =>
 {
    let requestBody=req.body;
    var notificationData= {
        access_token:requestBody.access_token,
        short_descript: requestBody.short,
        long_descript: requestBody.long,
        hyperlink:requestBody.link,
        header: requestBody.header
    };
    var newNotification=new Notification(notificationData);

    try
    {
        var saved=newNotification.save();
        var successMessage="Sucess: "+JSON.stringify(newNotification);
        res.status(201).send(successMessage);
    }
    catch(err)
    {
        res.status(403).json({message:err});
    }
 });