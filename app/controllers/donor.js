var express = require('express'),
  mongoose = require('mongoose'),
	routerDonors = express.Router(),
	Donor = mongoose.model('Donor')
	;

routerDonors.route('/')
	.all(function(err, res, next){
    next();
	})
	.get(function(req, res, next) {
		Donor.find(function (err, donors) {
			if (err) return next(err);
			res.json(donors);
		});
	})
	.post(function (req, res, next) {
		Donor.create(req.body, function (err, donor) {
			if (err) throw err;

			console.log('Donor created: ',donor);
			var id = donor._id;
			res.json({"result": "Added the donor with id: " + id});
		});

	})
	.delete(function (req, res, next) {
		Donor.remove({}, function (err, resp){
			if (err) throw err;

			res.json(resp);
		})
	})

;

routerDonors.route('/:donorId')
	.get(function (req, res, next) {

		Donor.findById(req.params.donorId, function (err, donor) {
			if (err) throw err;
			res.json(donor);
		});

	});

routerDonors.route('/near/:donorId/:distance')
	.get(function (req, res, next) {

		console.log(req.params.donorId);

		Donor.findById(req.params.donorId, function (err, donor) {

			if (err) throw err;

			console.log(donor.lastPosition);

			Donor.find({
				lastPosition: {
					$near : {
						$geometry : {
							type: 'Point',
							coordinates : donor.lastPosition.coordinates
						},
						$maxDistance : req.params.distance || 2000
					}
				}
			})
			.where('_id').ne(req.params.donorId)
			.exec(function (err, donors) {
				// if (err) throw err;

				res.json(donors);

			});

		});


	})
;

// routerDonors.route('/:distance')
// 	.get(function (req, res, next) {
//
// 		Donor.find({
// 			lastPosition: {
// 				$near : {
// 					$geometry : {
// 						type: 'Point',
// 						coordinates : [-3.300000, 45.525252]
// 					},
// 					// $maxDistance : 200000
// 					$maxDistance : req.params.distance
// 				}
// 			}
// 		}, function (err, donors) {
// 			if (err) throw err;
//
// 			res.json(donors);
//
// 		});
//
// 	})
// 	;


module.exports = function (app) {
	app.use('/donors', routerDonors);
};
