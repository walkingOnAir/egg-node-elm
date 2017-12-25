/**
 * Created by wangpeng on 2017/12/23.
 */

'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const adminSchema = new Schema({
    user_name: String,
    password: String,
    id: Number,
    create_time: String,
    admin: { type: String, default: '管理员' },
    // 1:普通管理、 2:超级管理员
    status: Number,
    avatar: { type: String, default: 'default.jpg' },
    city: String,
  });

  adminSchema.index({ id: 1 });
  return mongoose.model('Admin', adminSchema);
};
