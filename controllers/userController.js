const userService = require("../services/userService");
const jwt = require("jsonwebtoken");

//const maxAge = 2 * 60 * 60; //2H

const createToken = (id) => {
  return jwt.sign({ id }, process.env.Net_Secret, { expiresIn: "15m" });
};

const refreshToken = (id) => {
  return jwt.sign({ id }, process.env.Net_Secret, { expiresIn: "7d" });
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
      const tokenrefresh = refreshToken(user._id);
      res.cookie("jwt_token", token, { httpOnly: false, maxAge: 15 * 60 * 1000 });
      res.cookie("jwt_tokenrefresh", tokenrefresh, { httpOnly: false, maxAge: 7 * 24 * 60 * 60 * 1000 });
      res.status(200).json({ user , token , tokenrefresh });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.refreshToken = async (req, res) => {
    try {
      const refreshToken = req.cookies.jwt_tokenrefresh;

      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token manquant" });
      }        
      const decoded = jwt.verify(refreshToken, process.env.Net_Secret);

      const user = await userService.findUserById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }
      const accessToken = jwt.sign({ id : user._id }, process.env.Net_Secret, { expiresIn: "2h" });

      res.cookie("jwt_token", accessToken, { httpOnly: false, maxAge: 2 * 60 * 60 * 1000 });
      res.status(200).json({ user });
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

  module.exports.logout = async (req, res) => {
    try {
      const id = req.session.user._id;
      await userService.findUserById(id);
      res.cookie("jwt_token", "", { httpOnly: false, maxAge: 1 });
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };