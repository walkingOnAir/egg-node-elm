/**
 * Created by wangpeng on 2018/1/10.
 */

'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/service/admin/admin.test.js', () => {
  
  describe('getHongbaoList()', () => {
    it('should get a hongbao list', async () => {
      const ctx = app.mockContext();
      // 通过ctx访问到service
      const list = await ctx.service.promotion.hongbao.getHongbaoList({});
      assert(list);
    });
  });
  
  describe('getCount()', () => {
    it('should get list count', async () => {
      // 创建ctx
      const ctx = app.mockContext();
      // 通过ctx访问到service
      const count = await ctx.service.promotion.hongbao.getCount();
      assert(count > 1);
    });
  });
  
});