/**
 * Created by wangpeng on 2017/12/25.
 */
'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
const moment = require('moment');

describe('test/app/service/admin/admin.test.js', () => {

  describe('create()', () => {
    it('should create success', async () => {
      // 创建ctx
      const ctx = app.mockContext();
      // 通过ctx访问到service
      const adminUser = await ctx.service.admin.admin.create({
        user_name: 'admin',
        password: 'from admin.test.js',
        create_time: moment().format('YYYY-MM-DD'),
        admin: '超级管理员',
        status: 2,
      });
      assert(adminUser);
      assert(adminUser.id === 1);
    });
  });

  describe('findOneByUsername()', () => {
    it('should get an admin user', async () => {
      // 创建ctx
      const ctx = app.mockContext();
      // 通过ctx访问到service
      const adminUser = await ctx.service.admin.admin.findOneByUsername('admin');
      assert(adminUser);
    });
  });
  
  describe('getAdminList()', () => {
    it('should get admin user list', async () => {
      // 创建ctx
      const ctx = app.mockContext();
      // 通过ctx访问到service
      const adminUserList = await ctx.service.admin.admin.getAdminList();
      assert(adminUserList);
      assert(adminUserList[0].id === 1);
    });
  });
  
  describe('getAdminCount()', () => {
    it('should get admin count', async () => {
      // 创建ctx
      const ctx = app.mockContext();
      // 通过ctx访问到service
      const adminUserCount = await ctx.service.admin.admin.getAdminCount();
      assert(adminUserCount > 1);
    });
  });
  
  describe('getAdminInfoById()', () => {
    it('should get admin info by id', async () => {
      // 创建ctx
      const ctx = app.mockContext();
      // 通过ctx访问到service
      const adminUser = await ctx.service.admin.admin.getAdminInfoById(1);
      assert(adminUser);
    });
  });
  
  describe('updateAdminAvatar()', () => {
    it('should update admin avatar by id', async () => {
      // 创建ctx
      const ctx = app.mockContext();
      // 通过ctx访问到service
      const adminUser = await ctx.service.admin.admin.updateAdminAvatar(1, 'update.jpg');
      assert(adminUser.id === 1);
      assert(adminUser.avatar === 'update.jpg');
    });
  });
});
