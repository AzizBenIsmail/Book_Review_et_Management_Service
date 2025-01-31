const userService = require("../services/userService");
const jwt = require("jsonwebtoken");

const maxAge = 2 * 60 * 60; //2H

const createToken = (id) => {
  return jwt.sign({ id }, process.env.Net_Secret, { expiresIn: maxAge });
};

module.exports.getAllUsers = async (req, res) => {
    try {
      const userList = await userService.getAllUsers();
  
      res.status(200).json({ userList });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.register = async (req, res) => {
    try {
    const { userName , email, password } = req.body;
        
      const addedusers = await userService.register(userName , email, password);
  
      res.status(200).json({ addedusers });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  module.exports.login = async (req, res) => {
    try {
    const { email, password } = req.body;
        
      const user = await userService.login(email, password);
      const token = createToken(user._id);
      res.cookie("jwt_token", token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).json({ user , token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; 
        await userService.Delete(id);
        res.status(200).json( "deleted" );
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  };