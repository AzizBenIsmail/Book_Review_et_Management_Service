const userService = require("../services/userService");

module.exports.getAllUsers = async (req, res) => {
    try {
      const userList = await userService.getAllUsers();
  
      res.status(200).json({ userList });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

