/**
 * Created by wangpeng on 2017/12/23.
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const idsSchema = new Schema({
    restaurant_id: Number,
    food_id: Number,
    order_id: Number,
    user_id: Number,
    address_id: Number,
    cart_id: Number,
    img_id: Number,
    category_id: Number,
    item_id: Number,
    sku_id: Number,
    admin_id: Number,
    statis_id: Number,
  });
  
  return mongoose.model('Ids', idsSchema);
};