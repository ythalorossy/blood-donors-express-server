var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'blood-donors-express-server'
    },
    port: process.env.PORT || 4000,
    db: 'mongodb://localhost/blood-donors-express-server-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'blood-donors-express-server'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/blood-donors-express-server-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'blood-donors-express-server'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/blood-donors-express-server-production'
  }
};

module.exports = config[env];
