/**
 * Controller基类
 * Created by wangpeng on 2017/12/28.
 */
'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
//接口返回状态码
const CODE = require('../../constant/base/http_res_code');

class BaseController extends Controller {
  
  //当前页记录数
  get pageSize() {
    return 20;
  }
  //当前页
  get page() {
    return 1;
  }
  
  /**
   * 返回成功
   * @param message 成功信息
   * @param data 业务数据
   */
  success( message, data = {}) {
    this.ctx.body = {
      code: CODE.SUCCESS,
      data,
      msg: message || '成功',
      serverTime: new Date().getTime()
    };
  }
  
  /**
   * 返回失败
   * @param message 失败信息
   * @param data 业务数据
   */
  fail( message, data = {}) {
    this.ctx.body = {
      code: CODE.FAIL,
      data,
      msg: message || '失败',
      serverTime: new Date().getTime()
    };
  }
  
  /**
   * md5加密算法
   * @param str
   * @returns {*}
   */
  encryptOfMd5(str) {
    const md5 = crypto.createHash('md5');
    return md5.update(str).digest('base64');
  }
  
}

module.exports = BaseController;