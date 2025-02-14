require("dotenv").config();
const express = require("express");
const axios = require("axios");
const moment = require('moment-timezone');
const schedule = require('node-schedule');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1339898519858970654/G38LpzsAJjO85nz5Pj_8lWPJ4b_5IcQ4Yw4L3YgCVlwok-eSThV-0uIQfthqU3TOEEyO";

router.post('/send-message', async (req, res) => {
    const { message } = req.body;

    if (!message) return res.status(400).json({ error: "Message manquant" });

    try {
        await axios.post(DISCORD_WEBHOOK_URL, { content: message });
        res.status(200).json({ success: "Message envoyé sur Discord" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Échec de l'envoi du message" });
    }
});


router.post('/send-delayed-message', async (req, res) => {
    const { message, delayInMinutes } = req.body;

    if (!message || !delayInMinutes) {
        return res.status(400).json({ error: "Message ou délai en minutes manquant" });
    }

    // Convertir le délai en minutes en millisecondes
    const delayInMs = Number(delayInMinutes) * 60000;

    if (isNaN(delayInMs) || delayInMs <= 0) {
        return res.status(400).json({ error: "Délai invalide, assurez-vous que c'est un nombre positif en minutes" });
    }

    try {
        console.log(`Le message sera envoyé après ${delayInMinutes} minute(s)...`);

        // Planifier l'envoi du message après le délai spécifié par le client (en minutes)
        setTimeout(async () => {
            try {
                console.log(`📤 Envoi du message : "${message}" vers Discord après ${delayInMinutes} minute(s)...`);
                const response = await axios.post(DISCORD_WEBHOOK_URL, { content: message });
                console.log(`✅ Message envoyé avec succès ! Réponse Discord:`, response.data);
            } catch (error) {
                console.error("🚨 Erreur lors de l'envoi du message vers Discord:", error.response?.data || error.message);
            }
        }, delayInMs);

        res.json({ success: `Message sera envoyé après ${delayInMinutes} minute(s) !` });
    } catch (error) {
        console.error("🚨 Erreur interne:", error);
        res.status(500).json({ error: error.message || "Erreur interne du serveur" });
    }
});

// {
//     "message": "ahla wsahla message",
//     "delayInMinutes": 1 ,
//     "datetime": "2025-02-14T11:55:00Z"
// }
router.post('/send1-delayed-message', async (req, res) => {
    const { message, delayInMinutes, datetime } = req.body;

    // Vérifier que le message est présent
    if (!message || (!delayInMinutes && !datetime)) {
        return res.status(400).json({ error: "Message et délai ou date manquants" });
    }

    try {
        let delayInMs;
        let dateToSend;

        // Si le client a envoyé un délai en minutes
        if (delayInMinutes) {
            // Convertir les minutes en millisecondes
            delayInMs = Number(delayInMinutes) * 60000;

            if (isNaN(delayInMs) || delayInMs <= 0) {
                return res.status(400).json({ error: "Délai invalide, assurez-vous que c'est un nombre positif en minutes" });
            }

            // Calculer la date d'envoi à partir du délai
            dateToSend = new Date(Date.now() + delayInMs);  // Date actuelle + délai
        }

        // Si le client a envoyé une date précise
        if (datetime) {
            // Convertir la date de l'utilisateur en UTC
            dateToSend = moment(datetime).utc().toDate();

            if (isNaN(dateToSend.getTime())) {
                return res.status(400).json({ error: "Format de date invalide" });
            }

            if (dateToSend < new Date()) {
                return res.status(400).json({ error: "La date doit être dans le futur" });
            }
        }

        // Afficher la date en UTC pour vérifier
        console.log(`Le message sera envoyé à la date suivante (UTC): ${dateToSend}`);

        // Planifier l'envoi du message
        setTimeout(async () => {
            try {
                console.log(`📤 Envoi du message : "${message}" vers Discord à ${dateToSend}`);
                const response = await axios.post(DISCORD_WEBHOOK_URL, { content: message });
                console.log(`✅ Message envoyé avec succès ! Réponse Discord:`, response.data);
            } catch (error) {
                console.error("🚨 Erreur lors de l'envoi du message vers Discord:", error.response?.data || error.message);
            }
        }, dateToSend - Date.now()); // Le délai en ms jusqu'à la date d'envoi

        // Réponse avec la date en UTC
        res.json({ success: `Message sera envoyé à ${dateToSend} UTC` });
    } catch (error) {
        console.error("🚨 Erreur interne:", error);
        res.status(500).json({ error: error.message || "Erreur interne du serveur" });
    }
});

//pour le test sans confusion horaire
// {
//     "message": "Hello Discord!",
//     "datetime": "2025-02-14T11:55:00",
//     "timezone": "Africa/Tunis"
// }
router.post('/schedule-message', async (req, res) => {
    const { message, datetime, timezone } = req.body;

    if (!message || !datetime || !timezone) {
        return res.status(400).json({ error: "Message, date et fuseau horaire manquants" });
    }

    try {
        // Convertir l'heure locale (date + fuseau horaire) en UTC
        const dateInUTC = moment.tz(datetime, timezone).utc().toDate();

        console.log("📌 Date en UTC:", dateInUTC);
        console.log("📌 Date actuelle (locale):", new Date().toLocaleString());
        console.log("📌 Date actuelle (UTC):", new Date().toISOString());

        if (isNaN(dateInUTC.getTime())) {
            console.error("🚨 Erreur : Format de date invalide");
            return res.status(400).json({ error: "Format de date invalide" });
        }

        if (dateInUTC < new Date()) {
            console.error("🚨 Erreur : La date doit être dans le futur");
            return res.status(400).json({ error: "La date doit être dans le futur" });
        }

        // Planification de l'envoi du message
        const job = schedule.scheduleJob(dateInUTC, async () => {
            try {
                console.log(`📤 Envoi du message : "${message}" vers Discord à ${dateInUTC}`);
                const response = await axios.post(DISCORD_WEBHOOK_URL, { content: message });
                console.log(`✅ Message envoyé avec succès ! Réponse Discord:`, response.data);
            } catch (error) {
                console.error("🚨 Erreur lors de l'envoi du message vers Discord:", error.response?.data || error.message);
            }
        });

        if (!job) {
            console.error("🚨 Échec de la planification du job !");
            return res.status(500).json({ error: "Impossible de planifier le message" });
        }

        res.json({ success: `Message sera envoyé à ${dateInUTC} UTC` });
    } catch (error) {
        console.error("🚨 Erreur interne:", error);
        res.status(500).json({ error: error.message || "Erreur interne du serveur" });
    }
});

router.post('/send-message-imageLient', async (req, res) => {
    const { message, imageUrl } = req.body;

    if (!message) return res.status(400).json({ error: "Message manquant" });

    try {
        // Préparer le message avec une image (en utilisant un embed)
        const payload = {
            content: message,
            embeds: [
                {
                    image: {
                        url: imageUrl,  // URL de l'image
                    },
                },
            ],
        };

        // Envoyer le message au webhook Discord
        await axios.post(DISCORD_WEBHOOK_URL, payload);

        res.status(200).json({ success: "Message envoyé sur Discord avec l'image" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Échec de l'envoi du message avec l'image" });
    }
});


// Route pour envoyer le message avec une image
router.post('/send-message-imageAttach', async (req, res) => {
    const { message , imageName  } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message manquant" });
    }

    // Spécifiez le chemin absolu vers l'image locale dans le dossier public/images
    const imagePath = path.join(__dirname, '..', 'public', 'images', imageName );


    if (!fs.existsSync(imagePath)) {
        return res.status(400).json({ error: "Image non trouvée dans le dossier" });
    }

    try {
        // Créer une instance de FormData pour envoyer l'image et le message
        const form = new FormData();
        form.append('content', message); // Ajouter le message
        form.append('file', fs.createReadStream(imagePath)); // Ajouter l'image

        // Effectuer la requête HTTP POST vers Discord
        const response = await axios.post(DISCORD_WEBHOOK_URL, form, {
            headers: {
                ...form.getHeaders(), // Ajouter les en-têtes pour le multipart/form-data
            },
        });

        res.status(200).json({ success: "Message avec image envoyé sur Discord" });
    } catch (error) {
        console.error("Erreur lors de l'envoi du message avec image", error);
        res.status(500).json({ error: "Erreur interne lors de l'envoi du message avec image" });
    }
});

router.post('/send-video', async (req, res) => {
    const { message, videoName } = req.body; // Nom du fichier vidéo à envoyer

    if (!message) {
        return res.status(400).json({ error: "Message manquant" });
    }

    const videoPath = path.join(__dirname, '..', 'public', videoName );

    console.log("📌 Chemin de la vidéo :", videoPath);

    if (!fs.existsSync(videoPath)) {
        return res.status(400).json({ error: "Vidéo non trouvée dans le dossier public/videos" });
    }

    try {
        // Créer un formulaire multipart
        const form = new FormData();
        form.append('content', message); // Ajouter le message
        form.append('file', fs.createReadStream(videoPath)); // Ajouter la vidéo

        // Envoyer vers Discord
        const response = await axios.post(DISCORD_WEBHOOK_URL, form, {
            headers: { ...form.getHeaders() },
        });

        res.status(200).json({ success: "Message avec vidéo envoyé sur Discord" });
    } catch (error) {
        console.error("❌ Erreur Discord :", error.response?.data || error.message);
        res.status(500).json({ error: "Échec de l'envoi" });
    }
});

module.exports = router;
