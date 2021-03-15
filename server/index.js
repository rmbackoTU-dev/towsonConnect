const express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = process.env.PORT || 8080;
//accesses the .env file
require('dotenv/config');


//parses body into JSON
app.use(express.json());

//Import routes
var usersRoute = require('./routes/users');
var messagesRoute = require('./routes/messages');
var threadsRoute = require('./routes/threads');

//Use imported Routes
app.use('/users', usersRoute);
app.use('/messages', messagesRoute);
app.use('/threads', threadsRoute);

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
        //Listen on port
        app.listen(port);
        console.log('Listening on port ' + port);
    })
    .catch(err => console.error(err)
);


