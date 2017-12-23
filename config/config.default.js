'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513862025779_6947';

  // add your config here
  config.middleware = [];
  
  //egg-mongoose
  config.mongoose = {
    url: 'mongodb://127.0.0.1/elm',
    options: {}
  };

  return config;
};
