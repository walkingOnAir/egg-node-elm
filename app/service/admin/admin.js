/**
 * Created by wangpeng on 2017/12/25.
 */
'use strict';
const Service = require('egg').Service;

class AdminService extends Service {

  /**
   * 创建管理员账号
   * @param user 用户信息
   * @returns {Promise.<user>}
   */
  async create(user) {
    return this.ctx.model.Admin.create(user);
  }

  /**
   * 根据用户名查询管理员信息
   * @param username 用户名
   * @returns {Promise.<T|*>}
   */
  async findOneByUsername(username) {
    return this.ctx.model.Admin.find({ user_name: username });
  }
}

module.exports = AdminService;
