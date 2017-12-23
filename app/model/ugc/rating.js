/**
 * Created by wangpeng on 2017/12/23.
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const rateSchema = new Schema({
    restaurant_id: Number,
    ratings: [
      {
        avatar: {type: String, default: ''},
        highlights: [],
        item_ratings: [
          {
            food_id: Number,
            food_name: String,
            image_hash: {type: String, default: ''},
            is_valid: {type: Number, default: 1},
          },
        ],
        rated_at: String,
        rating_star: Number,
        rating_text: String,
        tags: {type: Array, default: []},
        time_spent_desc: String,
        username: {type: String, default: "匿名用户"},
      },
    ],
    scores: {
      compare_rating: {type: Number, default: 0},
      deliver_time: {type: Number, default: 0},
      food_score: {type: Number, default: 0},
      order_rating_amount: {type: Number, default: 0},
      overall_score: {type: Number, default: 0},
      service_score: {type: Number, default: 0},
    },
    tags: [{
      count: {type: Number, default: 0},
      name: String,
      unsatisfied: {type: Boolean, default: false},
    }]
  });
  
  rateSchema.index({id: 1});
  
  return mongoose.model('Rating', rateSchema);
};