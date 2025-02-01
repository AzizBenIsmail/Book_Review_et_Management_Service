const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: String,     
    author: String,     
    genre: String,     
    book_image: { type: String, required: false, },
    review : [{type : mongoose.Schema.Types.ObjectId, ref: 'review',}]
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;