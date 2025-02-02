const redis = require("redis");

// Crée un client Redis
const redisClient = redis.createClient({
  host: "localhost", // Adresse du serveur Redis
  port: 6379, // Port par défaut de Redis
});

// Gère les erreurs de connexion
redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = redisClient;