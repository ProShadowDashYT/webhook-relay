const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1505741685097889873/hyTfx_8hh6IZmJjIE9LXeJSBEFAmU7GCtszbg-V0rUMzxJ_sWqaZOoOJt0qzeAnSQrfh";

app.post("/webhook", async (req, res) => {
    try {
        const original = req.body;

        await axios.post(DISCORD_WEBHOOK, {
            content: "@everyone " + (original.content || "New event!"),
            allowed_mentions: {
                parse: ["everyone"]
            }
        });

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log("Server running"));