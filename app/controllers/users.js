var 
  express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , User = require('../models/user')
  , mongoose = require('mongoose')
  , Donor = mongoose.model('Donor')
  , Verify= require('../verify')
  , GeoJSON = require('mongoose-geojson-schema')
  ;

/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  
  User.find({}, function (err, users) {
    if (err) throw err;
    res.json(users);
  });

  
});

router.post('/register', function(req, res) {
    
    User.register(
			new User({ username : req.body.username }),
      req.body.password, 
			function(err, user) {
      
        if (err) {
          console.log(err);
          return res.status(500).json({err: err});
        }

        user.save(function (err, user) {
          
          if (err) {
            return res.status(500).json({status: 'User registration failed!'});
          }
          
          passport.authenticate('local')(req, res, function () {
            
            user.save(function (err, user) {
              
              if (err) {
                console.log(err);
                return res.status(500).json({status: 'User registration failed!'});
              }
              
              var donor = {
                firstname : req.body.firstname || '',
                lastname : req.body.lastname || '',
                bloodGroup: req.body.bloodGroup || '',
                lastPosition: req.body.lastPosition || {
                  type: 'Point',
                  coordinates: [0.0, 0.0]
                },
              //   lastPosition: {
              // 	  type: "Point",
              // 	  coordinates: [12.123456, 13.134578]
              // 	},
                lastDonation: new Date()
              };
                          
              Donor.create(donor, function (err, donor) {
                
                if (err) {
                  console.log(err);
                  return res.status(500).json({status: 'Donor registration failed!'});
                }
                
                return res.status(200).json({
                  status: 'Registration Succeful!',
                  user: user,
                  donor: donor
                });
                
              });
              
            });
            
          });
        });

    });
});

router.post('/login', function(req, res, next) {
  
  console.log('/login POST called!!!');
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

			if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }

      var token = Verify.getToken(user);

      res.status(200).json({
        status: 'Login successful!',
        success: true,
				user: user,
        token: token
      });

    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/facebook', passport.authenticate('facebook'),
  function(req, res){});

router.get('/facebook/callback', function(req,res,next){
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

module.exports = function (app) {
	app.use('/users', router);
};
