const mongoose = require("mongoose");
const seedDatabase = require("./seedDatabase"); // Assurez-vous que le chemin est correct

module.exports.connectToMongoDB = () => {
  mongoose.set("strictQuery", false);  //configure Mongoose pour désactiver le mode strict de validation des requêtes.
  mongoose
    .connect(process.env.Url_MongoDB)
    .then(async () => {
      console.log("connect To MongoDB");
      await seedDatabase(); // Initialisation automatique
    })
    .catch((error) => {
      console.log(error.message);
    });
};
