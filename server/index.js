const express = require('express');
var mongoose = require('mongoose');
var app = express();
//parses body into JSON
//app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
var port = process.env.PORT || 8080;
//accesses the .env file
require('dotenv/config');

//Import Role data for setup
var Role=require('./models/Role');



//Import routes
var usersRoute = require('./routes/users');
var messagesRoute = require('./routes/messages');
var threadsRoute = require('./routes/threads');
var notificationRoute=require('./routes/notifications')

//Use imported Routes
app.use('/users', usersRoute);
app.use('/messages', messagesRoute);
app.use('/threads', threadsRoute);
app.use('/notifications', notificationRoute );

//Routes
app.get('/', (req, res) => {
    res.send('Welcome to the party');
});


//Connects to DB
//DB_CONNECTION comes from the .env file; it is the database url
var options = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(process.env.DB_CONNECTION, options)
    .then( () => {
        console.log('Successfully connected to the database');
        //Create default data
        //only two roles so create them on the spot
        //TODO: later substitute a generated code through b-crypt for the access tokens
        var teacher={
            role_Name:"Teacher",
            access_Token:"t-01"
        };

        var student={
            role_Name:"Student",
            access_Token:"s-01"
        };
        var teacherRole=new Role(teacher);
        var studentRole=new Role(student);
        teacherDoc=teacherRole.save();
        studentDoc=studentRole.save();
        //Listen on port
        app.listen(port);
        console.log('Listening on port ' + port);

    })
    .catch(err => console.error(err)
);


