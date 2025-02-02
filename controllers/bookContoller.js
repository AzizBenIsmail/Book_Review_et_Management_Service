const bookService = require("../services/bookService");

module.exports.getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { BooksList, pagination } = await bookService.getAllBooks(
      page,
      limit
    );

    res.status(200).json({ BooksList, pagination });
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

    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookData = {
      ...req.body,
    };
    bookData.id = id;
    if (req.file) {
      const { filename } = req.file;
      bookData.book_image = filename;
    }
    const updatedBook = await bookService.updateBook(bookData);

    res.status(200).json({ updatedBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params; //get d id from params

    const BooksList = await bookService.findBookById(id);

    res.status(200).json({ BooksList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.searchBooks = async (req, res) => {
  try {
    const BooksList = await bookService.searchBooks(req.body);

    res.status(200).json({ BooksList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.searchFilterBooks = async (req, res) => {
  try {
    const {books ,currentPage , totalPages,totalBooks } = await bookService.searchFilterBooks(req.query);

    res.status(200).json({ books ,currentPage , totalPages,totalBooks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
