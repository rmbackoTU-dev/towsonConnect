//Require Mongoose
var mongoose=require('mongoose');

/**Schema model for 
 *      NOTIFICATION:
 *      _id: schema.Types.ObjectID
 *      role_Name:String
 *      access_Token:String
 */

//Define a schema
var Schema=mongoose.Schema;

var Role=new Schema({
    role_Name:String,
    access_Token:String
});

//only two roles so create them on the spot
//TODO: later substitute a generated code through b-crypt for the access tokens
var teacher=new Role({
    role_Name:"Teacher",
    access_Token:"t-01"
});

var teacher=new Role({
    role_Name:"Student",
    access_Token:"s-01"
});





module.exports=mongoose.model('Role', Role);