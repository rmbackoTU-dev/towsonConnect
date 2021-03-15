var express = require('express');
var router = express.Router();
//imports User model
var User = require('../models/User');

//gets all the users
router.get('/', async (req, res) => {
    try{
        var users = await User.find();
        res.status(200).json(users);
    }
    catch(err){
        res.status(404).json({ message: err });
    }
});


//submits/saves a user
router.post('/', async (req,res) => {
    var user = req.body;
    var newUser = new User(user);

    try{
        var savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});


//get specific user
router.get('/:userId', async (req,res) => {
    try{
        var user = await User.findById(req.params.userId);
        res.json(user);
    } catch(err) {
        res.json({ message: err });
    }
});


//Delete user
router.delete('/:userId', async (req,res) => {
    try{
        var removedUser = await User.remove({ _id: req.params.userId });
        res.json(removedUser);
    }
    catch(err){
        res.json({ message: err });
    }
});


//update a user
router.patch('/:userId', async (req, res) => {
    try{
        //$set{} takes in the parameter(s) that you want to update
        var updatedUser = await User.updateOne( { _id: req.params.userId }, 
                                                { $set: { age: req.body.age } }
        );
        res.json(updatedUser);
    } catch(err) {
        res.json({ message: err });
    }
});


module.exports = router;