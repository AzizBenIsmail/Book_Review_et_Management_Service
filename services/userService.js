const userModel = require("../models/userModel");

exports.getAllUsers = async () => {
    console.log(userModel.find())
  return await userModel.find();
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