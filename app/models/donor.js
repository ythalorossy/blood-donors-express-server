// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
	GeoJSON = require('mongoose-geojson-schema');

// var schema = new mongoose.Schema({
// 	any: mongoose.Schema.Types.GeoJSON,
// 	point: mongoose.Schema.Types.Point,
//   multipoint: mongoose.Schema.Types.MultiPoint,
//   linestring: mongoose.Schema.Types.LineString,
//   multilinestring: mongoose.Schema.Types.MultiLineString,
//   polygon: mongoose.Schema.Types.Polygon,
//   multipolygon: mongoose.Schema.Types.MultiPolygon,
//   geometry: mongoose.Schema.Types.Geometry,
//   geometrycollection: mongoose.Schema.Types.GeometryCollection,
//   feature: mongoose.Schema.Types.Feature,
//   featurecollection: mongoose.Schema.Types.FeatureCollection
// });

var DonorSchema = new Schema({
  name: String,
  email: String,
	avatar: String,
	lastPosition: mongoose.Schema.Types.Point,
	lastDonation: { type: Date, default: Date.now }
});

DonorSchema.index({lastPosition: '2dsphere'});

DonorSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Donor', DonorSchema);
