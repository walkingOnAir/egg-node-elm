/**
 * Created by wangpeng on 2017/12/23.
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const hongbaoSchema = new Schema({
    id: Number,
    sn: String,
    user_id: Number,
    amount: Number,
    sum_condition: Number,
    name: String,
    phone: String,
    begin_date: String,
    end_date: String,
    description_map: {
      phone: String,
      online_paid_only: String,
      validity_delta: String,
      validity_periods: String,
      sum_condition: String
    },
    limit_map: {},
    status: Number,
    present_status: Number,
    share_status: Number,
  });
  
  hongbaoSchema.index({id: 1});
  
  return mongoose.model('Hongbao', hongbaoSchema);
};