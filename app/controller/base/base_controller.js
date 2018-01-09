/**
 * Controller基类
 * Created by wangpeng on 2017/12/28.
 */
'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
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
  
  
  async upload() {
    const ctx = this.ctx;
    const logger = ctx.logger;
    const stream = await this.ctx.getFileStream();
    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      //写入硬盘
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      //必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      logger.error(err);
      return null;
    }
    //由于只能获取一次请求流，因此其他参数原样返回
    return {
      url: '/public/' + filename,
      ...stream.fields
    };
  }
  
}

module.exports = BaseController;