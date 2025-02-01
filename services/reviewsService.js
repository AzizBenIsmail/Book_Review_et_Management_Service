const reviewModel = require("../models/reviewsModel");
const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel");

exports.getAllreviews = async (page, limit) => {
  const offset = (page - 1) * limit;
  const reviewsList = await reviewModel.find().skip(offset).limit(limit);
  const totalReviews = await reviewModel.countDocuments();
  return {
    reviewsList,
    pagination: {
      totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
      currentPage: page,
      reviewsPerPage: limit,
    },
  };
};

exports.findreviewById = async (id) => {
  return await reviewModel.findById(id);
};

exports.addReview = async (rating, comment, bookId, userId) => {
  const book = await bookModel.findById(bookId);
  if (!book) {
    throw new Error("book not found");
  }

  const review = new reviewModel({
    rating,
    comment,
    book: bookId,
    user: userId,
  });

  await review.save()

   await userModel.findByIdAndUpdate(userId, {
    $push: { review: review._id }, //Tab
  });

   await bookModel.findByIdAndUpdate(bookId, {
    $push: { review: review._id }, //Tab
  });

  const userUpdated = await userModel.findById(userId)

  const bookUpdated =await bookModel.findById(bookId)

  return { review , bookUpdated , userUpdated} ;
};

exports.UpdateReviewById = async (email, password) => {
  return await reviewModel.login(email, password);
};

exports.DeleteReviewById = async (id) => {
  return await reviewModel.findByIdAndDelete(id);
};
