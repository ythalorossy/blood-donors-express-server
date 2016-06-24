var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var secretKey = '12345-67890-09876-54321';
var authenticate = {
	'facebook': {
			clientID: '219639945091846',
			clientSecret: 'b6e42c8e6f9a59ab4ce9e1c34df941a0',
			callbackURL: 'https://localhost:3443/users/facebook/callback'
	}
};

var config = {

  development: {
    root: rootPath,
    app: {
      name: 'blood-donors-express-server'
    },
    port: process.env.PORT || 4000,
    db: 'mongodb://localhost/blood-donors-express-server-development',
		authenticate : authenticate,
		secretKey: secretKey
  },

  test: {
    root: rootPath,
    app: {
      name: 'blood-donors-express-server'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/blood-donors-express-server-test',
		authenticate : authenticate,
		secretKey: secretKey
  },

  production: {
    root: rootPath,
    app: {
      name: 'blood-donors-express-server'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/blood-donors-express-server-production',
		authenticate : authenticate,
		secretKey: secretKey
  }
};

module.exports = config[env];
