import TelegramBot from 'node-telegram-bot-api';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const URL = process.env.BASE_URL;

const bot = new TelegramBot(TOKEN, { webHook: true });
// npm runngrok ngrokbot.setWebHook(`${URL}/api/telegram`);

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    console.log(body)

    // Check if body contains message and handle it
    if (body && body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text;

      // Respond to the message
      if (text === '/start') {
        bot.sendMessage(chatId, 'Hello! Welcome to our bot.');
      } else {
        bot.sendMessage(chatId, `You said: ${text}`);
      }
    }
    res.status(200).send('ok');  // Respond to Telegram's server
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
