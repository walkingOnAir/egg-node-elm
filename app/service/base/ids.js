/**
 * Created by wangpeng on 2018/1/2.
 */

'use strict';

const Service = require('egg').Service;

class idService extends Service {
  
  /**
   * 根据type获取id
   * @param type 集合类型，即字段名
   * @returns {Promise.<null>}
   */
  async getIdByType(type) {
    const ids = await this.ctx.model.Ids.findOne();
    //存在id
    if (ids && (ids[type] || ids[type] === 0)) {
      //自增
      ids[type]++;
      //保存
      ids.save();
      return ids[type];
    }
    return null;
  }
  
}

module.exports = idService;