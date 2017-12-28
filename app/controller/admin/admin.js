/**
 * Created by wangpeng on 2017/12/28.
 */

'use strict';

const BaseController = require('../base/base_controller');

class AdminController extends BaseController {
  
  async regiter() {
    const ctx = this.ctx;
    const req = ctx.request;
    const { user_name, password, status = 1} = req.body;
    try {
      //校验
      ctx.validate({
        user_name: {type: 'string', min: 6, max: 20},
        password: {type: 'string', min: 6, max: 20}
      });
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.fail();
      return;
    }
    
    
  }
  
  async login() {
  
  }
}

module.exports = AdminController;
