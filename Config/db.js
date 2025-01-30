const mongoose = require("mongoose");

module.exports.connectToMongoDB = () => {
  mongoose.set("strictQuery", false);  //configure Mongoose pour désactiver le mode strict de validation des requêtes.
  mongoose
    .connect("mongodb://localhost:27017")
    .then(() => {
      console.log("connect To MongoDB");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
