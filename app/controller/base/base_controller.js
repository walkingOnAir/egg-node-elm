/**
 * Controller基类
 * Created by wangpeng on 2017/12/28.
 */
'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
//接口返回状态码，可抽离单独封装
const CODE = {
  SUCCESS: 1,
  FAIL: 0
};

class BaseController extends Controller {
  
  /**
   * 返回成功
   * @param data 业务数据
   * @param msg 成功信息
   */
  success(data = {}, msg = '成功') {
    this.ctx.body = {
      code: CODE.SUCCESS,
      data,
      msg,
      serverTime: new Date().getTime()
    };
  }
  
  /**
   * 返回失败
   * @param data 业务数据
   * @param msg 失败信息
   */
  fail(data = {}, msg = '失败') {
    this.ctx.body = {
      code: CODE.FAIL,
      data,
      msg,
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