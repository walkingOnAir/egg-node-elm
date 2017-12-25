/**
 * Created by wangpeng on 2017/12/23.
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const entrySchema = new Schema({
    id: Number,
    is_in_serving: Boolean,
    description: String,
    title: String,
    link: String,
    image_url: String,
    icon_url: String,
    title_color: String,
  });

  entrySchema.index({ id: 1 });

  return mongoose.model('Entry', entrySchema);
};
