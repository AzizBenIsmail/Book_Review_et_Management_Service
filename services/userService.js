const userModel = require("../models/userModel");

exports.getAllUsers = async () => {
  return await userModel.find();
};

exports.findUserById = async (id) => {
  return await userModel.findById(id);
};


exports.register = async (userName , email, password) => {
    const role = "user"
    const user = new userModel({ userName , email, password ,role });
    return await user.save();
  };


  exports.login = async ( email, password) => {
    return await userModel.login(email, password);;
  };

  exports.Delete = async (id) => {
    return await userModel.findByIdAndDelete(id);;
  };