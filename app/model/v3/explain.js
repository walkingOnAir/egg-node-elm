/**
 * Created by wangpeng on 2017/12/23.
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const explainSchema = new Schema({
    data: Schema.Types.Mixed,
  });

  explainSchema.index({ id: 1 });

  return mongoose.model('Explain', explainSchema);
};
