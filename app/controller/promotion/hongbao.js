/**
 * Created by wangpeng on 2018/1/10.
 */

'use strict';

const BaseController = require('../base/base_controller');

class HongbaoController extends BaseController {
  
  /**
   * 获取红包列表
   * @returns {Promise.<void>}
   */
  async hongbaoHandle() {
    const ctx = this.ctx;
    const logger = ctx.logger;
    const req = ctx.request;
    let {present_status, page, pageSize} = req.body;
    if (!page) {
      page = this.page;
    }
    if (!pageSize) {
      pageSize = this.pageSize;
    }
    //获取红包列表
    let pager = ctx.helper.getLimitAndOffsetByParams(page, pageSize);
    const list = ctx.service.promotion.hongbao.getHongbaoList({present_status, ...pager});
    //获取总数
    const count = await ctx.service.promotion.hongbao.getCount();
    this.success('', {list, count});
  }
}

module.exports = HongbaoController;
