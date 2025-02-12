const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;

require("dotenv").config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,  // Remplacez par vos variables d'environnement
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/authGoogle/callback"  // Cette URL doit correspondre à votre route de callback
}, (token, tokenSecret, profile, done) => {
  // Vous pouvez gérer l'utilisateur ici, par exemple en l'enregistrant dans votre base de données
  return done(null, profile);
}));

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ["identify", "email"]
}, (accessToken, refreshToken, profile, done) => {
    console.log("🔹 Profil Discord reçu:", profile);
    return done(null, profile);
}));

// Sérialisation et Désérialisation
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


module.exports = passport;