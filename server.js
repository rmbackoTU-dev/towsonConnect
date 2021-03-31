// Imprt the depandencies
require('dotenv').config()
const express = require("express");
const app = express();

// Import the local depandencies
const mongoConnect = require('./configs/mongoDB');
const generalUserRoutes = require("./routes/generalUserRoutes")

// Express Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB atlas
mongoConnect()

// Routes
app.use("/authentication/", generalUserRoutes)

// Running the server on port 3000
app.listen(5000 || process.env.PORT, () => {
    console.log(`Server is running on port 5000 or ${process.env.PORT}`);
})