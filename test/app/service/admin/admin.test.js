/**
 * Created by wangpeng on 2017/12/25.
 */
'use strict';
const assert = require('assert');
const mock = require('egg-mock');
const moment = require('moment');

describe('test/app/service/admin/admin.test.js', () => {
  let app;
  before(async function() {
    app = mock.app();
    // 等待app启动成功，才能执行测试用例
    return app.ready();
  });

  afterEach(mock.restore);

  describe('create()', () => {
    it('should create success', async () => {
      // 创建ctx
      const ctx = app.mockContext();
      // 通过ctx访问到service
      const adminUser = await ctx.service.admin.admin.create({
        user_name: 'admin',
        password: 'admin',
        id: 1,
        create_time: moment().format('YYYY-MM-DD'),
        admin: '超级管理员',
        status: 2,
      });
      assert(adminUser);
      assert(adminUser.id === 1);
    });
  });

  describe('find()', () => {
    it('should get an admin user', async () => {
      // 创建ctx
      const ctx = app.mockContext();
      // 通过ctx访问到service
      const adminUser = await ctx.service.admin.admin.findOneByUsername({ user_name: 'admin' });
      assert(adminUser);
    });
  });
});
