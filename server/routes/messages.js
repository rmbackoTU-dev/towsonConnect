var express = require('express');
var router = express.Router();

//imports Message model
var Message = require('../models/Message');


// gets all the messages
router.get('/', async (req, res) => {
    try{
        var messages = await Message.find();
        res.json(messages);
        console.log(messages);
        //var s = messages;
        //console.log(s);
       // res.send(s);
    } catch(err) {
        res.json({message: err});
    }
});


// submits/saves a message
router.post('/', async (req,res) => {
    var message = req.body;
    var newMessage = new Message(message);

    try{
        var savedMessage = await newMessage.save();
        res.json(savedMessage);
    } catch (err) {
        res.json({ message: err });
    }
});


// get specific message using a userID
router.get('/:messageUserId', async (req,res) => {
    try{
        var message = await Message.find().where({ user_id: req.params.messageUserId });
        res.json(message);
    } catch(err) {
        res.json({ message: err });
    }
});


// Delete message
router.delete('/:messageId', async (req,res) => {
    try{
        var removedMessage = await Message.remove({ _id: req.params.messageId });
        res.json(removedMessage);
    } catch(err) {
        res.json({ message: err });
    }
});





module.exports = router;