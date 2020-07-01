/* eslint global-require: "off" */
switch (process.env.APP_ENV) {
  case 'development': {
    module.exports = require('./dev');
    break;
  }

  case 'test': {
    module.exports = require('./test');
    break;
  }

  case 'staging': {
    module.exports = require('./staging');
    break;
  }

  case 'production': {
    module.exports = require('./production');
    break;
  }

  default:
    case 'development': {
      module.exports = require('./dev');
      break;
    }
}
