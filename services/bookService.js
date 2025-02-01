const bookModel = require("../models/bookModel");

exports.getAllBooks = async () => {
  return await bookModel.find();
};

exports.findBookById = async (id) => {
  return await bookModel.findById(id);
};


exports.addBook = async (bookData) => {
    console.log(bookData);
    const book = new bookModel(bookData);
    return await book.save();
  };


  exports.updateBook = async ( email, password) => {
    return await bookModel.login(email, password);;
  };

  exports.deleteBookById = async (id) => {
    return await bookModel.findByIdAndDelete(id);;
  };