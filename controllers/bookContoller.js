const bookService = require("../services/bookService");

module.exports.getAllBooks = async (req, res) => {
  try {
    const BooksList = await bookService.getAllBooks();

    res.status(200).json({ BooksList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addBook = async (req, res) => {
  try {
    const bookData = {
      ...req.body,
    };
    if (req.file) {
      const { filename } = req.file;
      bookData.book_image = filename;
    }
    const addedBook = await bookService.addBook(bookData);

    res.status(200).json({ addedBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  module.exports.deleteBookById = async (req, res) => {
    try {
        const { id } = req.params; 
        await bookService.deleteBookById(id);
        res.status(200).json( "deleted" );
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  };