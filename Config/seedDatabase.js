const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

async function seedDatabase() {
  try {
    // Vérification et ajout des utilisateurs
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const salt = await bcrypt.genSalt();
      const users = [
        {
          userName: "admin",
          email: "admin.tn@gmail.com",
          password: await bcrypt.hash("Azerty123&", salt),
          role: "admin",
          user_image: "client.png",
        },
        {
          userName: "client",
          email: "client.tn@gmail.com",
          password: await bcrypt.hash("Azerty123&", salt),
          role: "user",
          user_image: "client.png",
        },
        {
          userName: "client1",
          email: "client1.tn@gmail.com",
          password: await bcrypt.hash("Azerty123&", salt),
          role: "user",
          user_image: "client.png",
        },
      ];
      await User.insertMany(users);
      console.log("Utilisateurs ajoutés avec succès");
    }

    // Vérification et ajout des livres
    const bookCount = await Book.countDocuments();
    if (bookCount === 0) {
      const books = [
        {
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          genre: "Fiction",
          book_image: "to-kill-a-mockingbird.jpg",
        },
        {
          title: "1984",
          author: "George Orwell",
          genre: "Dystopian",
          book_image: "1984.jpg",
        },
        {
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          genre: "Classic",
          book_image: "the-great-gatsby.jpg",
        },
        {
          title: "Pride and Prejudice",
          author: "Jane Austen",
          genre: "Romance",
          book_image: "pride-and-prejudice.jpg",
        },
        {
          title: "Moby-Dick",
          author: "Herman Melville",
          genre: "Adventure",
          book_image: "moby-dick.jpg",
        },
        {
          title: "The Catcher in the Rye",
          author: "J.D. Salinger",
          genre: "Coming of Age",
          book_image: "catcher-in-the-rye.jpg",
        },
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          genre: "Fantasy",
          book_image: "the-hobbit.jpg",
        },
        {
          title: "Fahrenheit 451",
          author: "Ray Bradbury",
          genre: "Science Fiction",
          book_image: "fahrenheit-451.jpg",
        },
        {
          title: "Crime and Punishment",
          author: "Fyodor Dostoevsky",
          genre: "Crime",
          book_image: "crime-and-punishment.jpg",
        },
        {
          title: "The Picture of Dorian Gray",
          author: "Oscar Wilde",
          genre: "Philosophical",
          book_image: "dorian-gray.jpg",
        },
      ];

      await Book.insertMany(books);
      console.log("Livres ajoutés avec succès");

      await Book.insertMany(books);
      console.log("Livres ajoutés avec succès");
    }
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la base de données :",
      error
    );
  }
}

module.exports = seedDatabase;
