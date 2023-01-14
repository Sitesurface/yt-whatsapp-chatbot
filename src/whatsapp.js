const getCompletionChatGPT = require("./completion_chatgpt");
const { saveMessage } = require("./db");

const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

async function connectWhatsapp() {
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.on("message", async (msg) => {
    saveMessage(msg.from, msg.body);
    const chat = await msg.getChat();
    const response = await getCompletionChatGPT(msg);
    chat.sendMessage(response.trim());
    saveMessage(msg.from, response.trim());
  });

  await client.initialize();
}

module.exports = connectWhatsapp;
