// Import deoandencies
const mongoose = require('mongoose')

// Import local depandencies


const mongoConnect = () => {
    mongoose.connect(process.env.URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true }, function(err, result){
        if(!err && result) {
            console.log("Successfully connected to MongoDB atlas");
        } else {
            console.log("Internal Server Error")
            console.log(err);
        }
    })
}

module.exports = mongoConnect
