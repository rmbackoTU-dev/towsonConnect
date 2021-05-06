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


const NotificationSchema = mongoose.model('Notification', new mongoose.Schema({
    short_descript: String,
    long_descript: String,
    hyperlink:String,
    header: String,
    type:String,
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
}));

module.exports= NotificationSchema;
