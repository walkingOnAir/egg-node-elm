/**
 * Created by wangpeng on 2017/12/28.
 */

'use strict';

const BaseController = require('../base/base_controller');
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class AdminController extends BaseController {
  
  /**
   * 注册
   * @returns {Promise.<void>}
   */
  async register() {
    const ctx = this.ctx;
    const req = ctx.request;
    const { user_name, password, status = 1} = req.body;
    try {
      //校验
      ctx.validate({
        user_name: {type: 'string', min: 5, max: 20},
        password: {type: 'string', min: 6, max: 20}
      });
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.fail(err.errors.map((ele) => {
        return ele.field + ' ' + ele.message;
      }).join(','));
      return;
    }
    
    //判断用户是否存在
    const adminUser = await ctx.service.admin.admin.findOneByUsername(user_name);
    if (adminUser) {
      this.fail('用户已存在');
    } else {
      //不存在，则添加到数据库中
      const adminTip = status === 1 ? '管理员' : '超级管理员';
      const encryPassword = this.encryptOfMd5(password);
      const addAdminUser = {
        user_name,
        password: encryPassword,
        create_time: ctx.helper.getCurrentTimeWithFormatter(),
        admin: adminTip,
        status
      };
      //添加
      const newAdminUser = await ctx.service.admin.admin.create(addAdminUser);
      if (newAdminUser) {
        this.success('注册管理员成功');
        return;
      }
      this.fail('注册管理员失败');
    }
    
  }
  
  /**
   * 登录
   * @returns {Promise.<void>}
   */
  async login() {
    const ctx = this.ctx;
    const req = ctx.request;
    const logger = ctx.logger;
    const { user_name, password, status = 1} = req.body;
    try {
      //校验
      ctx.validate({
        user_name: {type: 'string', min: 5, max: 20},
        password: {type: 'string', min: 6, max: 20}
      });
    } catch (err) {
      logger.warn(err.errors);
      this.fail(err.errors.map((ele) => {
        return ele.field + ' ' + ele.message;
      }).join(','));
      return;
    }
  
    //加密密码
    const encryPassword = this.encryptOfMd5(password);
    //判断用户是否存在
    const adminUser = await ctx.service.admin.admin.findOneByUsername(user_name);
    if (!adminUser) {
      //不存在此用户，直接注册
      const adminTip = status === 1 ? '管理员' : '超级管理员';
      const addAdminUser = {
        user_name,
        password: encryPassword,
        create_time: ctx.helper.getCurrentTimeWithFormatter(),
        admin: adminTip,
        status
      };
      //添加
      const newAdminUser = await ctx.service.admin.admin.create(addAdminUser);
      if (!newAdminUser) {
        this.fail('注册管理员失败');
        return;
      } else {
        //注册成功，直接登录
        ctx.sesssion.admin_id = newAdminUser.admin_id;
        this.success('注册管理员成功，自动登录');
      }
    } else {
      //存在此用户，直接登录
      if (encryPassword !== adminUser.password) {
        //密码错误
        this.fail('密码错误');
        return;
      }
      this.success('登录成功');
    }
  }
  
  /**
   * 登出
   * @returns {Promise.<void>}
   */
  async logout() {
    const ctx = this.ctx;
    //清除session
    ctx.session = null;
    this.success('登出成功');
  }
  
  /**
   * 获取管理员列表
   * @returns {Promise.<void>}
   */
  async getAdminList() {
    const ctx = this.ctx;
    const req = ctx.request;
    const logger = ctx.logger;
    let { page, pageSize} = req.body;
    if (!page) {
      page = this.page;
    }
    if (!pageSize) {
      pageSize = this.pageSize;
    }
    //获取列表
    const adminList = await ctx.service.admin.admin.getAdminList(ctx.helper.getLimitAndOffsetByParams(page, pageSize));
    //获取总数
    const count = await ctx.service.admin.admin.getAdminCount();
    this.success('', {adminList, count});
  }
  
  /**
   * 获取管理员数量
   * @returns {Promise.<*>}
   */
  async getAdminCount() {
    const ctx = this.ctx;
    const count = await ctx.service.admin.admin.getAdminCount();
    this.success('', count);
  }
  
  /**
   * 获取管理员信息
   * @returns {Promise.<void>}
   */
  async getAdminInfo() {
    const ctx = this.ctx;
    const req = ctx.request;
    const logger = ctx.logger;
    let { admin_id } = req.body;
    try {
      //校验
      ctx.validate({
        admin_id: {type: 'int'}
      });
    } catch (err) {
      logger.warn(err.errors);
      this.fail(err.errors.map((ele) => {
        return ele.field + ' ' + ele.message;
      }).join(','));
      return;
    }
    //获取管理员信息
    const adminInfo = ctx.service.admin.admin.getAdminInfoById(admin_id);
    this.success('', adminInfo);
  }
  
  /**
   * 更新管理员头像
   * @returns {Promise.<void>}
   */
  async updateAvatar() {
    const ctx = this.ctx;
    const logger = ctx.logger;
    try {
      //上传头像，获取上传路径
      const {id, url} = await this.upload();
      if (!id) {
        this.fail('id参数不正确');
        return;
      }
      //更新头像路径
      const adminInfo = await ctx.service.admin.admin.updateAdminAvatar(id, url);
      if (!adminInfo) {
        this.fail('更新头像失败');
        return;
      }
      this.success('更新头像成功', {url});
    } catch (err) {
      logger.error(err);
    }
    
  }
}

module.exports = AdminController;
