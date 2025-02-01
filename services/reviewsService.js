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

  await review.save();

  await userModel.findByIdAndUpdate(userId, {
    $push: { review: review._id }, //Tab
  });

  await bookModel.findByIdAndUpdate(bookId, {
    $push: { review: review._id }, //Tab
  });

  const userUpdated = await userModel.findById(userId);

  const bookUpdated = await bookModel.findById(bookId);

  return { review, bookUpdated, userUpdated };
};

exports.UpdateReviewById = async (reviewData, user) => {
  const review = await reviewModel.findById(reviewData.id);
  if (!review) {
    throw new Error("review not found !");
  }
  console.log(user.role)
  console.log(review.user)
  if (review.user.toString() !== user._id.toString() && user.role === 'user' ) {
    throw new Error("You are not the same user!");
  }

  await reviewModel.findByIdAndUpdate(reviewData.id, {
    $set: reviewData,
  });

  updatedReview = await reviewModel.findById(reviewData.id);

  return updatedReview;
};

exports.DeleteReviewById = async (id,user) => {
    const review = await reviewModel.findById(id);
    if (!review) {
      throw new Error("review not found !");
    }
    if (review.user.toString() !== user._id.toString() && user.role === 'user' ) {
        throw new Error("You are not the same user!");
    }
    await userModel.findByIdAndUpdate(review.user,{$pull : {review : id}})
    await bookModel.findByIdAndUpdate(review.book,{$pull : {review : id}})
  return await reviewModel.findByIdAndDelete(id);
};
