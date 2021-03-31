//Require Mongoose
var mongoose=require('mongoose');
const { findOneAndUpdate } = require('./Notification');

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
    access_token:String
});


module.exports=mongoose.model('Role', Role);