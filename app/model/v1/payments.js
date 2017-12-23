/**
 * Created by wangpeng on 2017/12/23.
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const paymentsSchema = new Schema({
    description: String,
    disabled_reason: String,
    id: Number,
    is_online_payment: Boolean,
    name: String,
    promotion: [],
    select_state: Number,
  });
  
  paymentsSchema.index({id: 1});
  
  return mongoose.model('Payments', paymentsSchema);
};