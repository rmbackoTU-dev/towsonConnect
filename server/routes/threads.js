var express = require('express');
var router = express.Router();

//imports Message model
var Message = require('../models/Message');
//imports Thread model
var Thread = require('../models/Thread');

// gets all the threads
router.get('/', async (req, res) => {
    try{
        var threads = await Thread.find();
        res.json(threads);
        console.log(threads);
        //var s = messages;
        //console.log(s);
       // res.send(s);
    } catch(err) {
        res.json({ message: err });
    }
});


// submits/saves a thread
router.post('/', async (req,res) => {
    var thread = req.body;
    var newThread = new Thread(thread);

    try{
        var savedThread = await newThread.save();
        res.json(savedThread);
    } catch (err) {
        res.json({ message: err });
    }
});


// get specific thread
router.get('/:threadId', async (req,res) => {
    try{
        var thread = await Thread.findById(req.params.threadId);
        console.log(thread);
        //array holding message ids
        var m_ids = thread.message_ids;
        //array for holding message JSON oobjects
        var ms = [];
        console.log(m_ids);
        for(var i = 0; i < m_ids.length; i++){
            var m = await Message.findById(m_ids[i]);
            ms.push(m);
            console.log(m.description);
        }
        console.log(ms);
        res.json(thread);
    } catch(err) {
        res.json({ message: err });
    }
});


// Delete thread
router.delete('/:threadId', async (req,res) => {
    try{
        var removedThread = await Thread.remove({ _id: req.params.threadId });
        res.json(removedThread);
    } catch(err) {
        res.json({ message: err });
    }
});





module.exports = router;