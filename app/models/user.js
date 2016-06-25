var
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose'),
	GeoJSON = require('mongoose-geojson-schema');

var User = new Schema({
    username: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    admin:   {
        type: Boolean,
        default: false
    }
});

User.index({lastPosition: '2dsphere'});

User.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

User.methods.getName = function () {
  return (this.firstname + ' ' + this.lastname);
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
