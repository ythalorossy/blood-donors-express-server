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
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
		lastPosition: {
			type: mongoose.Schema.Types.Point
		},
		lastDonation: {
			type: Date,
			default: Date.now
		},
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
