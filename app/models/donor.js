// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
	GeoJSON = require('mongoose-geojson-schema');

var schema = new mongoose.Schema({
	any: mongoose.Schema.Types.GeoJSON,
	point: mongoose.Schema.Types.Point,
  multipoint: mongoose.Schema.Types.MultiPoint,
  linestring: mongoose.Schema.Types.LineString,
  multilinestring: mongoose.Schema.Types.MultiLineString,
  polygon: mongoose.Schema.Types.Polygon,
  multipolygon: mongoose.Schema.Types.MultiPolygon,
  geometry: mongoose.Schema.Types.Geometry,
  geometrycollection: mongoose.Schema.Types.GeometryCollection,
  feature: mongoose.Schema.Types.Feature,
  featurecollection: mongoose.Schema.Types.FeatureCollection
});

var DonorSchema = new Schema({
  user:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
	lastPosition: mongoose.Schema.Types.Point,
	lastDonation: {
		type: Date,
		default: Date.now
	},
  bloodGroup : {
    type: String, 
    default: ''
  },

});

mongoose.model('Donor', DonorSchema);
