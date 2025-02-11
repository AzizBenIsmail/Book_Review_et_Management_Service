
const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load environment variables

const router = express.Router();
const DEEPSEEK_API_KEY = "sk-65579ba80b294eba8b253e89519ff82c"; // Store key in .env file

// Endpoint pour générer du texte avec DeepSeek
router.post("/generate", async (req, res) => {
  const { prompt, domain } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Le prompt est requis" });
  }

  try {
    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: `Tu es un rédacteur expert en ${domain}. Rédige un post professionnel.` },
          { role: "user", content: prompt },
        ],
        max_tokens: 200,
      },
      {
        headers: {
          "Authorization": `Bearer sk-65579ba80b294eba8b253e89519ff82c`,
          "Content-Type": "application/json"
        },
      }
    );

    res.json({ generatedText: response.data.choices[0].message.content });

  } catch (error) {
    console.error("Erreur API DeepSeek :", error.response ? error.response.data : error.message);

    // Handle insufficient balance error
    if (error.response && error.response.data.error.code === "invalid_request_error") {
      return res.status(402).json({ error: "Votre solde DeepSeek est insuffisant. Rechargez votre compte pour continuer." });
    }

    res.status(500).json({ error: "Erreur lors de la génération du texte", details: error.response ? error.response.data : error.message });
  }
});


module.exports = router;
