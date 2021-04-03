var express = require('express');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 8080;

// access the .env file
require('dotenv/config');

// parses the body into JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Import routes
var usersRoute = require('./routes/users');
var messagesRoute = require('./routes/messages');
var threadsRoute = require('./routes/threads');
var notificationsRoute = require('./routes/notifications');

var Role = require('./models/Role');

// Use imported routes
app.use('/users', usersRoute);
app.use('/messages', messagesRoute);
app.use('/threads', threadsRoute);
app.use('/notifications', notificationsRoute);

// Default route
app.get('/', (req, res) => {
    res.send('Default Page');
});

// Connects to DB
// DB_CONNECTION comes from the .env file; it is the database url
var options = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(process.env.DB_CONNECTION, options)
    .then( async () => {
        console.log('Successfully connected to the database');

        //Create default data
        //only two roles so create them on the spot
        //TODO: later substitute a generated code through b-crypt for the access tokens
        var teacher = {
            role_Name: "Teacher",
            access_token: "t-01"
        };

        var student = {
            role_Name: "Student",
            access_token: "s-01"
        };
        var teacherRole = new Role(teacher);
        var studentRole = new Role(student);
        teacherDoc = await teacherRole.save();
        studentDoc = await studentRole.save();
        console.log(teacherDoc);
        console.log(studentDoc);

        //Listen on port
        app.listen(port);
        console.log('Listening on port ' + port);
    })
    .catch(err => console.error(err)
);
