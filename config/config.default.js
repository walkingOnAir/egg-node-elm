'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513862025779_6947';

  // 中间件配置
  config.middleware = ['respHeader'];

  // egg-mongoose配置
  config.mongoose = {
    url: 'mongodb://127.0.0.1/elm',
    options: {},
  };

  return config;
};
