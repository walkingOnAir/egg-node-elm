/**
 * Created by wangpeng on 2017/12/25.
 */
'use strict';
const Service = require('egg').Service;
const IDS_TYPE = require('../../constant/base/ids');

class AdminService extends Service {

  /**
   * 创建管理员账号
   * @param user 用户信息
   * @returns {Promise.<user>}
   */
  async create(user) {
    const ctx = this.ctx;
    //获取管理员待添加id
    const id = await ctx.service.base.ids.getIdByType(IDS_TYPE.ADMIN_ID);
    if (id) {
      user.id = id;
    } else {
      ctx.logger.error('管理员id获取失败');
      return null;
    }
    return ctx.model.Admin.Admin.create(user);
  }

  /**
   * 根据用户名查询管理员信息
   * @param username 用户名
   * @returns {Promise.<T|*>}
   */
  async findOneByUsername(username) {
    return this.ctx.model.Admin.Admin.findOne({ user_name: username });
  }
  
  /**
   * 分页获取管理员信息
   * @param limit
   * @param offset
   * @returns {Promise.<*>}
   */
  async getAdminList({limit = 20, offset = 0}) {
    return this.ctx.model.Admin.Admin.find({}, {_id: 0, password: 0})
      .sort({id: -1})
      .skip(Number(offset))
      .limit(Number(limit));
  }
  
  /**
   * 获取管理员数量
   * @returns {Promise.<*|{type, default}>}
   */
  async getAdminCount() {
    return this.ctx.model.Admin.Admin.count();
  }
  
  /**
   * 根据id获取管理员信息
   * @param id
   * @returns {Promise.<T>}
   */
  async getAdminInfoById(id) {
    return this.ctx.model.Admin.Admin.find({id}, {_id: 0, __v: 0, password: 0});
  }
  
  /**
   * 根据id更新管理员头像
   * @param id
   * @param avatar
   * @returns {Promise.<*>}
   */
  async updateAdminAvatar(id, avatar) {
    return this.ctx.model.Admin.Admin.findOneAndUpdate({id}, {$set: {avatar}});
  }
}

module.exports = AdminService;
