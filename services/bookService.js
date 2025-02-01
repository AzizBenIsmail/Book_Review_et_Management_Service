const bookModel = require("../models/bookModel");
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
        // 1. Récupère les détails du livre depuis la base de données
        const book = await bookModel.findById(id);
        if (!book) {
          throw new Error("Livre non trouvé");
        }
    
        // 2. (Optionnel) Enrichir les données avec une API externe (Google Books)
        const googleBooksResponse = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(book.title)}`
        );
    
        const googleBookData = googleBooksResponse.data.items?.[0]?.volumeInfo || null;
    
        // 3. Combine les données
        const enrichedBook = {
          ...book.toObject(), // Convertit le document Mongoose en objet JavaScript
          externalData: googleBookData, // Ajoute les données de l'API externe
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
  const checkIfBookExists = await bookModel.findById(bookData.id);
  if (!checkIfBookExists) {
    throw new Error("Book not found !");
  }

  await bookModel.findByIdAndUpdate(bookData.id, {
    $set: bookData,
  });

  updatedBook = await bookModel.findById(bookData.id);

  return updatedBook;
};

exports.deleteBookById = async (id) => {
  return await bookModel.findByIdAndDelete(id);
};
