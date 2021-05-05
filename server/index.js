var express = require('express');
var mongoose = require('mongoose');
var cors=require('cors');
const dotenv=require("dotenv");
var app = express();


console.log("Setting up");

// access the .env file
dotenv.config();
var port = process.env.PORT || 8080;
// parses the body into JSON
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Import routes
var usersRoute = require('./routes/users');
var messagesRoute = require('./routes/messages');
var threadsRoute = require('./routes/threads');
var notificationsRoute = require('./routes/notifications');
var courses=require("./routes/courses");
var teacher=require("./routes/teachercourselist");
var student=require("./routes/students");


// Use imported routes
app.use('/users', usersRoute);
app.use('/messages', messagesRoute);
app.use('/threads', threadsRoute);
app.use('/notifications', notificationsRoute);
app.use("/courses",courses);
app.use("/teacher",teacher);
app.use("/student",student);

// Default route
app.get('/', (req, res) => {
    console.log("Site Operational");
    res.send('Default Page');
});

// Connects to DB
// DB_CONNECTION comes from the .env file; it is the database url
var options = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(process.env.DB_CONNECTION, options)
    .then( async () => {
        console.log('Successfully connected to the database');
        //Listen on port
        app.listen(port);
        console.log('Listening on port ' + port);
    })
    .catch(err => console.error(err)
);
