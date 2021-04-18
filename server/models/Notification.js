var mongoose = require('mongoose');

/**Schema model for 
 *      NOTIFICATION:
 *      _id: schema.Types.ObjectID
 *      access_token: String
 *      short_description: String
 *      long_description: String
 *      header: String 
 */

//Define a schema
/*
var Schema=mongoose.Schema;

var Notification = new Schema({
    access_token:String,
    short_descript: String,
    long_descript: String,
    hyperlink:String,
    header: String
});
*/

var NotificationSchema = mongoose.Schema({
    access_token: String,
    short_description: String,
    long_description: String,
    hyperlink:String,
    header: String
});

//module.exports=mongoose.model('Notification', Notification);
module.exports = mongoose.model("Notification", NotificationSchema);