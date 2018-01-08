/**
 * Created by wangpeng on 2018/1/8.
 */

'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const path = require('path');

describe('test/app/controller/admin/admin.test.js', () => {
  
  describe('register()', () => {
    it('should regiser an admin user', async () => {
      return app.httpRequest()
        .post('/register')
        .type('form')
        .send({
          user_name: 'admin123456',
          password: '123456'
        })
        .expect(200)
        .expect((res) => {
          res.body.code === 1;
          res.body.msg === '注册管理员成功';
        });
    });
  
    it('should return fail', async () => {
      return app.httpRequest()
        .post('/register')
        .type('form')
        .send({
          user_name: 'admin123456',
          password: '123456'
        })
        .expect(200)
        .expect((res) => {
          res.body.code === 0;
          res.body.msg === '用户已存在';
        });
    });
  });
  
  describe('login()', () => {
    it('should login success', async () => {
      return app.httpRequest()
        .post('/login')
        .type('form')
        .send({
          user_name: 'admin',
          password: '123456'
        })
        .expect(200)
        .expect((res) => {
          res.body.code === 1;
          res.body.msg === '登录成功';
        });
    });
  });
  
  describe('logout()', () => {
    it('should login out success', async () => {
      return app.httpRequest()
        .post('/logout')
        .type('form')
        .expect(200)
        .expect((res) => {
          res.body.code === 1;
          res.body.msg === '登出成功';
        });
    });
  });
  
  describe('getAdminList()', () => {
    it('should get admin user list', async () => {
      return app.httpRequest()
        .post('/getAdminList')
        .type('form')
        .expect(200)
        .expect((res) => {
          res.body.code === 1;
          res.body.msg === '成功';
        });
    });
  });
  
  describe('getAdminCount()', () => {
    it('should get admin user count', async () => {
      return app.httpRequest()
        .post('/getAdminCount')
        .type('form')
        .expect(200)
        .expect((res) => {
          res.body.code === 1;
          res.body.msg === '成功';
        });
    });
  });
  
  describe('getAdminInfo()', () => {
    it('should get admin user info', async () => {
      return app.httpRequest()
        .post('/getAdminInfo')
        .type('form')
        .expect(200)
        .expect((res) => {
          res.body.code === 1;
          res.body.msg === '成功';
        });
    });
  });
  
  describe('updateAvatar()', () => {
    it('should update admin user avatar', async () => {
      return app.httpRequest()
        .post('/updateAvatar')
        .field('name', 'update_avatar')
        .attach('file', path.join(__dirname, 'update_avatar.jpg'))
        .expect(200)
        .expect((res) => {
          res.body.code === 1;
          res.body.url === '/public/update_avatar.jpg';
        });
    });
  });
  
});