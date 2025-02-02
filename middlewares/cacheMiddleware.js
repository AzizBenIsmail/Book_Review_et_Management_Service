const redisClient = require("../redis");

const cacheMiddleware = (cacheKey) => {
  return (req, res, next) => {
    // Vérifie si les données sont dans le cache
    redisClient.get(cacheKey, (err, data) => {
      if (err) throw err;

      if (data !== null) {
        // Si les données sont dans le cache, les renvoyer directement
        res.json(JSON.parse(data));
      } else {
        // Si les données ne sont pas dans le cache, passer à la suite
        next();
      }
    });
  };
};

module.exports = cacheMiddleware;