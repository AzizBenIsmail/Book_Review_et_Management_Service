const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const ControledAcces = async (req, res, next) => {
  req.session.user = user;

  if (user.role === "admin") {
    next();
  } else {
    res.status(401).json("/tu n'es pas autorise ...");
  }
};

module.exports = { ControledAcces };
