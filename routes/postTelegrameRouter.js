const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const axios = require("axios");
const moment = require('moment-timezone');
const schedule = require('node-schedule');

const TELEGRAM_BOT_TOKEN = "7731229628:AAFUi8imePd6OlLoIzQhhwhm6KMCPYpUkz4";
const TELEGRAM_CHAT_ID = "-4723076338";

router.post("/send-message-telegram", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message manquant" });
  }

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }
    );

    // const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    //     chat_id: TELEGRAM_CHAT_ID,
    //     text: "*Hello* _depuis_ [mon bot](https://t.me/mybot) ! 🚀",
    //     parse_mode: "Markdown"
    // });

    res.status(200).json({ success: "Message envoyé sur Telegram" });
  } catch (error) {
    console.error(
      "❌ Erreur Telegram :",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Échec de l'envoi du message" });
  }
});

router.post("/send-video-telegram", async (req, res) => {
  const { message, videoName } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message manquant" });
  }

  const videoPath = path.join(__dirname, "..", "public", videoName);

  console.log("📌 Chemin de la vidéo :", videoPath);

  if (!fs.existsSync(videoPath)) {
    return res
      .status(400)
      .json({ error: "Vidéo non trouvée dans le dossier public/videos" });
  }

  try {
    // Créer un formulaire multipart
    const form = new FormData();
    form.append("chat_id", TELEGRAM_CHAT_ID);
    form.append("caption", message); // Ajouter le message
    form.append("video", fs.createReadStream(videoPath)); // Ajouter la vidéo

    // Envoyer vers Telegram
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVideo`,
      form,
      {
        headers: { ...form.getHeaders() },
      }
    );

    res.status(200).json({ success: "Message avec vidéo envoyé sur Telegram" });
  } catch (error) {
    console.error(
      "❌ Erreur Telegram :",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Échec de l'envoi" });
  }
});

router.post("/send-message-with-image", async (req, res) => {
  const { message, imageName } = req.body;

  if (!message) return res.status(400).json({ error: "Message manquant" });

  try {
    const photoPath = path.join(__dirname, "..", "public", "images", imageName);
    const photoStream = fs.createReadStream(photoPath); // Lire l'image

    const formData = {
      chat_id: TELEGRAM_CHAT_ID,
      photo: photoStream,
      caption: message, // Ajouter le message comme légende de l'image
    };

    // Envoi de la photo avec le message
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    res.json({
      success: "Message avec image envoyé sur Telegram",
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi du message avec image:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Échec de l'envoi du message avec image" });
  }
});

router.post("/sendMessageWithDelay", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message manquant" });
    }
    // Délai de 1 minute (60000 ms)
    const delay = 60000;

    // Utiliser setTimeout pour envoyer après 1 minute
    setTimeout(async () => {
      try {
        const response = await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
              chat_id: TELEGRAM_CHAT_ID,
              text: message,
            }
          );
        console.log("✅ Message avec image envoyé sur Telegram", response.data);
      } catch (error) {
        console.error(
          "Erreur lors de l'envoi du message avec image:",
          error.response?.data || error.message
        );
      }
    }, delay);
    res.json({ success: "Message planifié avec image pour être envoyé après 1 minute." });
} catch (error) {
    console.error(
      "❌ Erreur Telegram :",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Échec de l'envoi du message" });
  }
});

router.post('/send-messageDelayInMinutes', async (req, res) => {
    const { message, delayInMinutes } = req.body;

    // Vérification que le message et le délai sont fournis
    if (!message || delayInMinutes === undefined) {
        return res.status(400).json({ error: "Message ou délai manquant" });
    }

    // Vérifier que le délai est un nombre positif
    if (isNaN(delayInMinutes) || delayInMinutes <= 0) {
        return res.status(400).json({ error: "Le délai doit être un nombre positif" });
    }

    try {
        // Convertir le délai en millisecondes
        const delay = delayInMinutes * 60 * 1000; // 1 minute = 60 * 1000 ms

        const formData = {
            chat_id: TELEGRAM_CHAT_ID,
            text: message, // Envoie uniquement le texte
        };

        // Utiliser setTimeout pour envoyer après le délai spécifié
        setTimeout(async () => {
            try {
                const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, formData);
                console.log('✅ Message envoyé sur Telegram:', response.data);
            } catch (error) {
                console.error("Erreur lors de l'envoi du message:", error.response?.data || error.message);
            }
        }, delay);

        res.json({ success: `Message planifié pour être envoyé après ${delayInMinutes} minute(s).` });

    } catch (error) {
        console.error("Erreur interne:", error);
        res.status(500).json({ error: "Échec de la planification de l'envoi du message" });
    }
});


// {
//     "message": "Bonjour ! Ceci est un test de message programmé sur Telegram.",
//     "datetime": "2025-02-14T11:00:00",
//     "timezone": "Africa/Tunis"
//   }
  

router.post('/schedule-telegram-message', async (req, res) => {
    const { message, datetime, timezone } = req.body;

    // Vérification des paramètres
    if (!message || !datetime || !timezone) {
        return res.status(400).json({ error: "Message, date et fuseau horaire manquants" });
    }

    try {
        // Convertir l'heure locale (date + fuseau horaire) en UTC
        const dateInUTC = moment.tz(datetime, timezone).utc().toDate();

        console.log("📌 Date en UTC:", dateInUTC);
        console.log("📌 Date actuelle (locale):", new Date().toLocaleString());
        console.log("📌 Date actuelle (UTC):", new Date().toISOString());

        // Vérification si la date est valide
        if (isNaN(dateInUTC.getTime())) {
            console.error("🚨 Erreur : Format de date invalide");
            return res.status(400).json({ error: "Format de date invalide" });
        }

        // Vérification si la date est dans le futur
        if (dateInUTC < new Date()) {
            console.error("🚨 Erreur : La date doit être dans le futur");
            return res.status(400).json({ error: "La date doit être dans le futur" });
        }

        // Planification de l'envoi du message
        const job = schedule.scheduleJob(dateInUTC, async () => {
            try {
                console.log(`📤 Envoi du message : "${message}" vers Telegram à ${dateInUTC}`);
                const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message
                });
                console.log(`✅ Message envoyé avec succès ! Réponse Telegram:`, response.data);
            } catch (error) {
                console.error("🚨 Erreur lors de l'envoi du message vers Telegram:", error.response?.data || error.message);
            }
        });

        // Si la planification échoue
        if (!job) {
            console.error("🚨 Échec de la planification du job !");
            return res.status(500).json({ error: "Impossible de planifier le message" });
        }

        // Réponse au client
        res.json({ success: `Message sera envoyé à ${dateInUTC} UTC` });
    } catch (error) {
        console.error("🚨 Erreur interne:", error);
        res.status(500).json({ error: error.message || "Erreur interne du serveur" });
    }
});

module.exports = router;
