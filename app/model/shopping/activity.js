/**
 * Created by wangpeng on 2017/12/23.
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const activitySchema = new Schema({
    description: String,
    icon_color: String,
    icon_name: String,
    id: Number,
    name: String,
    ranking_weight: Number,
  });

  activitySchema.index({ id: 1 });

  return mongoose.model('Activity', activitySchema);
};
