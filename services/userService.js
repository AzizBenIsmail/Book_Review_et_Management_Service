const userModel = require("../models/userModel");

exports.getAllUsers = async () => {
    console.log(userModel.find())
  return await userModel.find();
};

