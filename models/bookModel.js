const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const bookSchema = new mongoose.Schema(
  {
    title: String,     
    author: String,     
    genre: String,     
    book_image: { type: String, required: false, },

  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;