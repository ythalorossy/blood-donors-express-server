var
	mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, passportLocalMongoose = require('passport-local-mongoose')
	;

var User = new Schema({
    username: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    admin: { type: Boolean, default: false }
});

User.index({lastPosition: '2dsphere'});

User.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);