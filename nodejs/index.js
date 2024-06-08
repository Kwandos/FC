const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const DISCORD_BOT_TOKEN = 'MTI0ODk3ODk1Njc5MTcwOTY5Ng.GyX3xi.HM1GyStWxb_I1NyJ26wkd_PR18UFA3EXMJGHxg';
const CHANNEL_ID = '1223262115943415969';

let images = [];

client.once('ready', async () => {
    console.log('Bot is ready!');
    try {
        const channel = await client.channels.fetch(CHANNEL_ID);
        if (channel) {
            console.log('Channel found!');
            const fetchedMessages = await channel.messages.fetch({ limit: 100 });
            fetchedMessages.forEach(msg => {
                if (msg.attachments.size > 0) {
                    console.log('Message with attachment found:', msg.content);
                    msg.attachments.forEach(attachment => {
                        console.log('Attachment URL:', attachment.url); // Log de URL van de bijlage
                        if (attachment.url.match(/\.(jpeg|jpg|gif|png)(\?.*)?$/)) { // Aangepaste regex
                            images.push(attachment.url);
                            console.log(`Added image: ${attachment.url}`);
                        } else {
                            console.log('Attachment is not an image');
                        }
                    });
                } else {
                    console.log('No attachments found in this message.');
                }
            });
            console.log(`Total images found: ${images.length}`);
        } else {
            console.error('Channel not found!');
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
});

client.login(DISCORD_BOT_TOKEN).catch(error => {
    console.error('Error logging in:', error);
});

app.use(express.static('public'));

app.get('/images', (req, res) => {
    console.log('API called');
    res.json(images);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
