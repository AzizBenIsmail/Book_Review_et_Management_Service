const userService = require("../services/userService");

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
