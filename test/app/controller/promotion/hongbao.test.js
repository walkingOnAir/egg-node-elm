/**
 * Created by wangpeng on 2018/1/10.
 */

'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/promotion/hongbao.test.js', () => {

  describe('hongbaoHandle()', () => {
    
    it('should get hongbao list', async () => {
      return app.httpRequest()
        .post('/hongbaoHandle')
        .type('form')
        .expect(200)
        .expect((res) => {
          res.body.code === 1;
          res.body.msg === '成功';
        });
    });
  });
});