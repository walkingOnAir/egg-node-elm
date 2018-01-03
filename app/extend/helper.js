/**
 * Created by wangpeng on 2018/1/3.
 */

'use strict';

const moment = require('moment');

module.exports = {
  
  /**
   * 获取格式化的当前时间
   * @param formatter
   */
  getCurrentTimeWithFormatter(formatter = 'YYYY-MM-DD') {
    return moment().format(formatter);
  },
  /**
   * 获取分页参数
   * @param page 当前页
   * @param pageSize 当前页记录数
   */
  getLimitAndOffsetByParams(page, pageSize) {
    if (!page || !pageSize) {
      this.ctx.logger.error('分页参数错误');
    }
    return {
      limit: pageSize,
      offset: page * pageSize - pageSize
    };
  },
};