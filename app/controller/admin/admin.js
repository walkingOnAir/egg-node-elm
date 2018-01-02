/**
 * Created by wangpeng on 2017/12/28.
 */

'use strict';

const BaseController = require('../base/base_controller');
const IDS_TYPE = require('../../constant/base/ids');

class AdminController extends BaseController {
  
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
      const adminId = await this.getIdByType(IDS_TYPE.ADMIN_ID);
      const encryPassword = this.encryptOfMd5(password);
      const addAdminUser = {
        user_name,
        password: encryPassword,
        id: adminId,
        create_time: this.getCurrentTimeWithFormatter(),
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
  
  async login() {
  
  }
}

module.exports = AdminController;
