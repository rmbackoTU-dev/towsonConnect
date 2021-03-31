var express = require('express');
var router = express.Router();
//imports User model
var User = require('../models/User');
var Role = require('../models/Role');

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
    // var user = req.body;
    // var userRole;
    if(req.body.role === "teacher")
    {
        try
        {
            userRole=await Role.findOne({role_Name:"Teacher"});
        }
        catch(err)
        {
            res.status(400).json({ message: err });
        }
    }
    else if( req.body.role === "student")
    {
        try
        {
            userRole=await Role.findOne({role_Name:'Student'});
            console.log(userRole);
        }
        catch(err)
        {
            res.status(400).json({ message: err });
        }
    }
    else
    {
        res.status(403).json({message:"Error role "+
        req.body.role+" does not exist"});
    }

    var user=
    {
        fname:req.body.fname,
        lname:req.body.lname,
        age:req.body.age,
        role:userRole._id,
        access_token:req.body.access_token
    }
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
    User.findById(req.params.userId).populate('role').exec( function(err, user)
    {
        if(err)
        {
                res.json({message: err});
        }
        else
        {
            res.json(user);
        }
    });
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