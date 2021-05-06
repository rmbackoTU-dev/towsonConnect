var express = require('express');
var router = express.Router();

// import User model
var User = require('../models/User');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { userName: "", email: "", password: "" };

    // Incorrect Email while login...
    if (err.message === "Incorrect Username or E-mail") {
        errors.email = "That userName or email is not Registrated. Consider Signup.";
        errors.userName = "That userName or email is not Registrated. Consider Signup.";
        return errors;
    }

    // Incorrect Password while login...
    if (err.message === "Incorrect Password") {
        errors.password = "That Password is incorrect. Try Again.";
        return errors;
    }

    // duplicate error handle...
    if(err.code === 11000) {
        if(err.keyPattern.userName === 1) {
            errors.userName = "This UserName has been taken. Try another one.";
            return errors;
        } else {
            errors.email = "This email is already registrated";
            return errors;
        }
    }

    // Validation Errors...
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}


// gets all the users
router.get('/', async(req, res) => {
    try{
        var users = await User.find();
        res.status(200).json(users);
    }
    catch(err){
        res.status(404).json({ message: err });
    }
});

// get a specific user
router.get('/:userId', async (req, res) => {
    try{
        var user = await User.findById(req.params.userId);
        res.json(user);
    }
    catch(err){
        res.json({ message: err });
    }
});

// submits/saves a user
router.post('/', async (req, res) => {
    var user = req.body;
    var newUser = new User(user);

    try{
        var savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }
    catch(err){
        res.status(400).json({ message: err });
    }
});

// Signup route
router.post('/signup', async( req, res) => {
    // Get data from req.body
    const { userName, email, password , userType} = req.body;

    try {
        // console.log("The user name is "+userName);
        // console.log("The password is "+password);
        // console.log("The email is "+email);
        // console.log("The user type is "+userType);
        const user = await User.create({ userName, email, password, userType}); // Creating new user...
        console.log("User Created successfully...");
        res.status(201).json({ status: "success", userId: user._id, userType: user.userType }); 
    } 
    catch(err) {
        console.log(err);
        const errors = handleErrors(err);  // If any conditional error occures by the user, then handle it...
        res.status(400).send({ errors });  
    }   
});

// Login route
router.post('/login', async (req, res) => {
    const {userNameOrEmail, password} = req.body; // Getting the data from the frontend using body-parser...
    //  console.log("UsernameOrEmail "+userNameOrEmail);
    //  console.log("password "+password);
    try {
        const user = await User.login(userNameOrEmail, password);  // Login the user using Statics function of User data model...
        res.status(200).json({ status: "success", user: user._id});  
    } 
    catch(err) {
        // console.log(err);
        const errors = handleErrors(err);  // If any conditional error occures by the user, then handel it...
        // console.log(errors);
        res.status(400).json({ errors });  
    }
});

// delete a user
router.delete('/:userId', async (req, res) => {
    try{
        var removedUser = await User.remove({ _id: req.params.userId });
        res.json(removedUser);
    }
    catch(err){
        res.json({ message: err });
    }
});

// update a user
router.patch('/:userId', async (req, res) => {
    try{
        var updatedUser = await User.updateOne({ _id: req.params.userId },
                                               { $set: { fname: req.body.fname } }
                                               );
        res.json({ updatedUser });
    }
    catch(err){
        res.json({ message: err });
    }
});


module.exports = router;