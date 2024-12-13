// Import the required package
const TelegramBot = require("node-telegram-bot-api");

// Replace with your bot token
const TOKEN = "7680369312:AAEjThdkNGn5a46Cx_AlDXBTRCx-oAz_jBo";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TOKEN, { polling: true });

// Log that the bot is running
console.log("Bot is running");

// List of options and buttons
const botOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "💸 Buy XAUUSD", callback_data: "buy_xauusd" },
        { text: "💰 Buy BTC", callback_data: "buy_btc" },
      ],
      [
        { text: "📉 Sell XAUUSD", callback_data: "sell_xauusd" },
        { text: "📉 Sell BTC", callback_data: "sell_btc" },
      ],
      [
        { text: "❌ Close XAUUSD", callback_data: "close_xauusd" },
        { text: "❌ Close BTC", callback_data: "close_btc" },
      ],
      [
        { text: "🌓 Close Half XAUUSD", callback_data: "close_half_xauusd" },
        { text: "🌓 Close Half BTC", callback_data: "close_half_btc" },
      ],
      [
        { text: "🗑️ Delete XAUUSD", callback_data: "delete_xauusd" },
        { text: "🗑️ Delete BTC", callback_data: "delete_btc" },
      ],
    ],
  },
};

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to playing this bot! 🎮", botOptions);
});

// Handle button clicks
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const action = query.data.split("_")[0];
  const instrument = query.data.split("_")[1].toUpperCase();

  if (action) {
    const options = {
      reply_markup: {
        force_reply: true,
      },
    };

    bot
      .sendMessage(
        chatId,
        `Enter your amount for ${action} ${instrument}:`,
        options
      )
      .then((sentMessage) => {
        bot.onReplyToMessage(chatId, sentMessage.message_id, (reply) => {
          const amount = reply.text;
          bot.sendMessage(
            chatId,
            `You are ${action}ing amount ${amount} of ${instrument}`
          );
        });
      });
  }
});
