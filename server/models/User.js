var mongoose = require('mongoose');
var { isEmail } = require('validator');
var bcrypt = require('bcrypt');

// define User schema for Mongoose operations
var UserSchema = mongoose.Schema({
    fname: String,
    lname: String,
    userName: {
        type: String,
        required: [true, "Please Enter Your Username"],
        unique: [true, "This userName has been taken already. Please enter anything else."]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email."],
        unique: [true, "This email is alredy registered. Please consider login."],
        lowercase: true,
        validate: [isEmail, "Please Enter a Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: [6, "Length must be greated than 6"]
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// fire a function before doc saved to DB...
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Static Method to login the user...
UserSchema.statics.login = async function(userNameOrEmail, password){
    var user = await this.findOne({ email: userNameOrEmail });
    if (user){
        var auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        else{
            throw Error("Incorrect Password");
        }
    }
    else{
        var user = await this.findOne({ userName: userNameOrEmail });
        if(user){
            var auth = await bcrypt.compare(password, user.password);
            if(auth){
                return user;
            }
            else{
                throw Error("Incorrect Password");
            }
        }
        else{
            throw Error("Incorrect Username or E-mail");
        }
    }
};


module.exports = mongoose.model('Users', UserSchema);