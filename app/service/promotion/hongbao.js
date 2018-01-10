/**
 * Created by wangpeng on 2018/1/10.
 */

'use strict';

const Service  = require('egg').Service;

class HongbaoService extends Service {
  
  /**
   * 根据获取红包列表
   * @param limit
   * @param offset
   * @param present_status 状态
   * @returns {Promise.<*>}
   */
  async getHongbaoList({limit = 20, offset = 0, present_status}) {
    let queryParam = {};
    if (present_status) {
      queryParam.present_status = present_status;
    }
    return this.ctx.model.Promotion.Hongbao.find(queryParam, {_id: 0})
      .skip(Number(offset))
      .limit(Number(limit));
  }
  
  /**
   * 获取红包数量
   * @returns {Promise.<*|{type, default}>}
   */
  async getCount() {
    return this.ctx.model.Promotion.Hongbao.count();
  }
}

module.exports = HongbaoService;