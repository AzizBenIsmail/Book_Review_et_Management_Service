const express = require("express");
const { OpenAI } = require("openai");

const router = express.Router();

// Initialiser OpenAI avec la clé API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Endpoint pour générer du texte
router.post("/generate", async (req, res) => {
  const { prompt, domain } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Le prompt est requis" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Tu es un rédacteur expert en ${domain}. Rédige un post professionnel.`,
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
    });

    res.json({ generatedText: response.choices[0].message.content });
  } catch (error) {
    console.error("Erreur API OpenAI :", error);
    res.status(500).json({ error: "Erreur lors de la génération du texte" });
  }
});

module.exports = router;
