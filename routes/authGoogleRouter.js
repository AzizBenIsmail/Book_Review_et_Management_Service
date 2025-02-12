var express = require("express");
var passport = require("passport");
var router = express.Router();

// Route pour démarrer l'authentification avec Google
router.get("/", passport.authenticate("google", {
  scope: ["profile", "email"], // Vous pouvez ajouter d'autres scopes si nécessaire
}));

router.get("/callback", 
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication failed" });
      }
  
      // Structurer les données renvoyées
      const userInfo = {
        name: req.user.displayName,
        given_name: req.user.name.givenName,
        family_name: req.user.name.familyName,
        picture: req.user.photos[0].value,
        email: req.user.emails[0].value
      };
  
      res.json({ message: "Authentication successful", user: userInfo });
    }
  );
  
// Route de logout
router.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      req.session.destroy(() => {
        res.json({ message: "Logout successful" });
      });
    });
  });
  
module.exports = router;
