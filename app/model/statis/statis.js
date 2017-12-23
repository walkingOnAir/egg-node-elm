/**
 * Created by wangpeng on 2017/12/23.
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const statisSchema = new Schema({
    date: String,
    origin: String,
    id: Number,
  });
  
  statisSchema.index({id: 1});
  
  return mongoose.model('Statis', statisSchema);
};