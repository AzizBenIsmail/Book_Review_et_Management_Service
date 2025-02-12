var express = require("express");
var passport = require("passport");
var router = express.Router();

// Lancer l'authentification Discord
router.get("/", passport.authenticate("discord"));

// Callback après authentification réussie
router.get("/callback",
    passport.authenticate("discord", { failureRedirect: "/" }),
    (req, res) => {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        // Vérifier les infos reçues
        console.log("✅ Utilisateur authentifié:", req.user);

        // Renvoyer les infos de l'utilisateur
        const userInfo = {
            id: req.user.id,
            username: req.user.username,
            discriminator: req.user.discriminator,
            avatar: req.user.avatar,
            email: req.user.email
        };

        res.json({ message: "Authentication successful", user: userInfo });
    }
);

// Route de déconnexion
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
