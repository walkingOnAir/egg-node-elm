/**
 * Created by wangpeng on 2017/12/27.
 */
'use strict';

module.exports = options => {
  return async function(ctx, next) {
    await next();
    const req = ctx.request;
    const res = ctx.response;
    ctx.set('Access-Control-Allow-Origin', req.headers.origin || '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('X-Powered-By', '3.2.1');
    if (req.method === 'OPTIONS') {
      ctx.status = 200;
    }
  }
};