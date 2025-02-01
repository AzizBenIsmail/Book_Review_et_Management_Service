const reviewsService = require("../services/reviewsService");

module.exports.getAllReviws = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { reviewsList, pagination } = await reviewsService.getAllreviews(
      page,
      limit
    );

    res.status(200).json({ reviewsList, pagination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addReview = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { rating, comment } = req.body;
    const userId = req.session.user._id;
    const { review, bookUpdated, userUpdated } =
      await reviewsService.addReview(rating, comment, bookId, userId);

    res.status(200).json({ review, bookUpdated, userUpdated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
