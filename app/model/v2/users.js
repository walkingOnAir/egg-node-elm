/**
 * Created by wangpeng on 2017/12/23.
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const userSchema = new Schema({
    user_id: Number,
    username: String,
    password: String,
  });
  
  userSchema.index({id: 1});
  
  return mongoose.model('User', userSchema);
};