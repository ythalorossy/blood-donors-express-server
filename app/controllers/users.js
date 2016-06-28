var
  express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  User = require('../models/user'),
  mongoose = require('mongoose'),
  ObjectId = mongoose.Schema.Types.ObjectId,
  Donor = mongoose.model('Donor'),
  Verify = require('../verify');

router.post('/register', function(req, res) {

  User.register(
    new User({
      username: req.body.username
    }),
    req.body.password,
    function(err, user) {

      if (err) return res.status(500).json({
        err: err
      });

      user.save(function(err, user) {

        if (err) return res.status(500).json({
          status: 'User registration failed!'
        });

        passport.authenticate('local')(req, res, function() {

          user.save(function(err, user) {

            if (err) return res.status(500).json({
              status: 'User authenticate failed!'
            });

            var donor = {
              'user': user._id,
              'firstname': req.body.firstname || '',
              'lastname': req.body.lastname || '',
              'bloodGroup': req.body.bloodGroup || '',
              'lastPosition': req.body.lastPosition || {
                type: 'Point',
                coordinates: [0.0, 0.0]
              },
              'lastDonation': new Date()
            };

            Donor.create(donor, function(err, donor) {

              if (err) return res.status(500).json({
                status: 'Donor registration failed!'
              });

              return res.status(200).json({
                status: 'Registration Succeful!',
                'user': user._id,
                'donor': donor,
                'token': Verify.getToken(user)
              });

            });

          });

        });

      });

    });
});

router.post('/login', function(req, res, next) {

  passport.authenticate('local', function(err, user, info) {

    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        err: info
      });
    }

    req.logIn(user, function(err) {

      if (err) return res.status(500).json({
        err: 'Could not log in user'
      });

      Donor.findOne({
        'user': req.user._id
      }).exec(function(err, donor) {

        if (err) {
          console.log(err);
        }

        res.status(200).json({
          success: true,
          'user': user,
          'donor': donor,
          'token': Verify.getToken(user)
        });

      });
      
    });

  })(req, res, next);
});

module.exports = function(app) {
  app.use('/users', router);
};
