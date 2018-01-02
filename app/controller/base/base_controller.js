/**
 * Controller基类
 * Created by wangpeng on 2017/12/28.
 */
'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
const moment = require('moment');
//接口返回状态码
const CODE = require('../../constant/base/http_res_code');
//ids type
const IDS_TYPE = require('../../constant/base/ids');

class BaseController extends Controller {
  
  /**
   * 返回成功
   * @param msg 成功信息
   * @param data 业务数据
   */
  success( msg = '成功', data = {}) {
    this.ctx.body = {
      code: CODE.SUCCESS,
      data,
      msg,
      serverTime: new Date().getTime()
    };
  }
  
  /**
   * 返回失败
   * @param msg 失败信息
   * @param data 业务数据
   */
  fail( msg = '失败', data = {}) {
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
  
  /**
   * 根据type获取id
   * @param type 集合类型
   * @returns {Promise.<*>}
   */
  async getIdByType(type) {
    const ctx = this.ctx;
    const id = await ctx.service.base.ids.getIdByType(type);
    if (id) {
      return id;
    } else {
      ctx.logger.error('id类型数据库错误');
      this.fail('服务器内部错误');
    }
  }
  
  /**
   * 获取格式化的当前时间
   * @param formatter
   */
  getCurrentTimeWithFormatter(formatter = 'YYYY-MM-DD') {
    return moment().format(formatter)
  }
}

module.exports = BaseController;