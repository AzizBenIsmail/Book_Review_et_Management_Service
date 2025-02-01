const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: Number,     
    comment: String,     

    book : {type : mongoose.Schema.Types.ObjectId, ref: 'book',} ,
    user : {type : mongoose.Schema.Types.ObjectId, ref: 'User',}  



  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;