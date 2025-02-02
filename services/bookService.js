const bookModel = require("../models/bookModel");
const reviewsModel = require("../models/reviewsModel");
const userModel = require("../models/userModel");
const axios = require("axios"); 

exports.getAllBooks = async (page, limit) => {
  const offset = (page - 1) * limit;
  const BooksList = await bookModel.find().skip(offset).limit(limit);
  const totalBooks = await bookModel.countDocuments();
  return {
    BooksList,
    pagination: {
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
      booksPerPage: limit,
    },
  };
};

exports.findBookById = async (id) => {
    try {
        const book = await bookModel.findById(id);
        if (!book) {
          throw new Error("Livre non trouvé");
        }
    
        const googleBook = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(book.title)}`
        );
    
        const googleBookData = googleBook.data.items?.[0]?.volumeInfo || null;

        const enrichedBook = {
          ...book.toObject(), 
          externalData: googleBookData, 
        };
    
        return enrichedBook;
      } catch (error) {
        throw error;
      }
};

exports.addBook = async (bookData) => {
  console.log(bookData);
  const book = new bookModel(bookData);
  return await book.save();
};

exports.updateBook = async (bookData) => {
  const book = await bookModel.findById(bookData.id);
  if (!book) {
    throw new Error("Book not found !");
  }

  await bookModel.findByIdAndUpdate(bookData.id, {
    $set: bookData,
  });

  updatedBook = await bookModel.findById(bookData.id);

  return updatedBook;
};

exports.deleteBookById = async (id) => {
  await reviewsModel.deleteMany({book : id})
  //probleme au niveau supp relation avec user complique 
  return await bookModel.findByIdAndDelete(id);
};

exports.searchBooks = async (data) => {
  try {
    const search = {};

    if (data.title) {
      search.title = { $regex: data.title, $options: 'i' }; 
    }

    if (data.author) {
      search.author = { $regex: data.author, $options: 'i' };
    }

    if (data.genre) {
      search.genre = { $regex: data.genre, $options: 'i' };
    }

    // Rechercher les livres correspondant aux critères
    const books = await bookModel.find(search);
    
    if (books.length === 0) {
      throw new Error("Aucun livre correspondant trouvé");
    }

    return books;
  } catch (error) {
    throw error;
  }
};

exports.searchFilterBooks = async (query) => {
  try {
    const search = {};

    if (query.title) {
      search.title = { $regex: query.title, $options: 'i' };
    }

    if (query.author) {
      search.author = { $regex: query.author, $options: 'i' };
    }

    if (query.genre) {
      search.genre = { $regex: query.genre, $options: 'i' };
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await bookModel
      .find(search)
      .skip(skip)
      .limit(limit);

    const totalBooks = await bookModel.countDocuments(search);

    return {
      books,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
    };
  } catch (error) {
    throw error;
  }
};