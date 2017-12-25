/**
 * Created by wangpeng on 2017/12/23.
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const categorySchema = new Schema({
    count: Number,
    id: Number,
    ids: [],
    image_url: String,
    level: Number,
    name: String,
    sub_categories: [
      {
        count: Number,
        id: Number,
        image_url: String,
        level: Number,
        name: String,
      },
    ],
  });

  categorySchema.index({ id: 1 });

  return mongoose.model('Category', categorySchema);
};
