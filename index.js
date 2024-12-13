require('dotenv').config()

const { Telegraf, Markup } = require('telegraf')

let trade_status = "";
let trade_times, trade_amount, trade_initial, trade_step, trade_result;

const renderingButtons = async (ctx) => {
    const markup = Markup.inlineKeyboard([
        [
            Markup.button.callback('👜 Buy with XAU', 'BUY_BUTTON_XAU'),
            Markup.button.callback('👜 Buy with BTC', "BUY_BUTTON_BTC"),
        ],
        [
            Markup.button.callback('💸 Sell with XAU', 'SELL_BUTTON_XAU'),
            Markup.button.callback('💸 Sell with XAU', "SELL_BUTTON_BTC"),
        ],
        [
            Markup.button.callback('⏹️ Close', 'CLOSE_BUTTON_XAU'),
            Markup.button.callback('⏹️ Close', "CLOSE_BUTTON_BTC"),
        ],
        [
            Markup.button.callback('🔢 Close Half', 'ClOSE_HALF_BUTTON_XAU'),
            Markup.button.callback('🔢 Close Half', "ClOSE_HALF_BUTTON_BTC"),
        ],
        [
            Markup.button.callback('❌ Delete', 'DELETE_BUTTON_XAU'),
            Markup.button.callback('❌ Delete', "DELETE_BUTTON_BTC"),
        ]
    ]).resize()
    await ctx.reply('CLICK THE BUTTON', markup)
}

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply('Welcome to CROSS-PLATFORM BOT!');
    renderingButtons(ctx);
    return;
})

bot.help((ctx) => ctx.reply('This is a help message!'))

const action_list = {
    BUY_BUTTON_XAU: async(ctx) =>  {
        trade_status = "BUY_BUTTON_XAU_TIMES";
        await ctx.reply('Please type how many times you want to trade from 1 to 5.');
    },
    SELL_BUTTON_XAU:async(ctx) =>  {
        trade_status = "SELL_BUTTON_XAU_TIMES";
        await ctx.reply('Please type how many times you want to trade from 1 to 5.');
    },
    BUY_BUTTON_BTC: async(ctx) =>  {
        trade_status = "BUY_BUTTON_BTC_TIMES";
        await ctx.reply('Please type how many times you want to trade from 1 to 5.');
    },
    SELL_BUTTON_BTC:async(ctx) =>  {
        trade_status = "SELL_BUTTON_BTC_TIMES";
        await ctx.reply('Please type how many times you want to trade from 1 to 5.');
    }
}


Object.keys(action_list).forEach((action) => {
    bot.action(action, action_list[action]);
});


bot.on('text', async (ctx) => {
    const chatId = ctx.chat.id
    const message = ctx.message.text
    switch (trade_status) {
        case 'BUY_BUTTON_XAU_TIMES':
            trade_times = parseInt(message);
            if(trade_times >5 || trade_times < 3) {
                trade_status = "BUY_BUTTON_XAU_TIMES";
                await ctx.reply('Please type how many times you want to trade from 3 to 5 correctly.');
            }
            else{
                trade_status = "BUY_BUTTON_XAU_AMOUNT";
                await ctx.reply('Please Type the amount of XAU you want to buy.');
            }
            break;
        case 'BUY_BUTTON_XAU_AMOUNT':
            console.log('test2')
            trade_amount = parseInt(message);
            trade_status = "BUY_BUTTON_XAU_STEP";
            await ctx.reply('Please Type the Increments of XAU you want.');
            break;
        case 'BUY_BUTTON_XAU_STEP':
            trade_step = parseInt(message);
            trade_status = "BUY_BUTTON_XAU_INITIAL";
            await ctx.reply('Please Type the Initial price of XAU you want.');
            break;
        case 'BUY_BUTTON_XAU_INITIAL':
            trade_initial = parseInt(message);
            trade_result = trade_initial + trade_amount +(trade_times - 1) * trade_step;
            trade_status = "";
            await ctx.reply('Buy of XAU ' + trade_result);
            break;
        case 'SELL_BUTTON_XAU_TIMES':
            trade_times = parseInt(message);
            if(trade_times >5 || trade_times < 3) {
                trade_status = "SELL_BUTTON_XAU_TIMES";
                await ctx.reply('Please type how many times you want to trade from 3 to 5 correctly.');
            }
            else{
                trade_status = "SELL_BUTTON_XAU_AMOUNT";
                await ctx.reply('Please Type the amount of XAU you want to sell.');
            }
            break;
        case 'SELL_BUTTON_XAU_AMOUNT':
            console.log('test2')
            trade_amount = parseInt(message);
            trade_status = "SELL_BUTTON_XAU_STEP";
            await ctx.reply('Please Type the Increments of XAU you want.');
            break;
        case 'SELL_BUTTON_XAU_STEP':
            trade_step = parseInt(message);
            trade_status = "SELL_BUTTON_XAU_INITIAL";
            await ctx.reply('Please Type the Initial price of XAU you want.');
            break;
        case 'SELL_BUTTON_XAU_INITIAL':
            trade_initial = parseInt(message);
            trade_result = trade_initial - trade_amount - (trade_times - 1) * trade_step;
            trade_status = "";
            await ctx.reply('Sell of XAU ' + trade_result);
            break;
        case 'BUY_BUTTON_BTC_TIMES':
            trade_times = parseInt(message);
            if(trade_times >5 || trade_times < 3) {
                trade_status = "BUY_BUTTON_BTC_TIMES";
                await ctx.reply('Please type how many times you want to trade from 3 to 5 correctly.');
            }
            else{
                trade_status = "BUY_BUTTON_BTC_AMOUNT";
                await ctx.reply('Please Type the amount of BTC you want to buy.');
            }
            break;
        case 'BUY_BUTTON_BTC_AMOUNT':
            console.log('test2')
            trade_amount = parseInt(message);
            trade_status = "BUY_BUTTON_BTC_STEP";
            await ctx.reply('Please Type the Increments of BTC you want.');
            break;
        case 'BUY_BUTTON_BTC_STEP':
            trade_step = parseInt(message);
            trade_status = "BUY_BUTTON_BTC_INITIAL";
            await ctx.reply('Please Type the Initial price of BTC you want.');
            break;
        case 'BUY_BUTTON_BTC_INITIAL':
            trade_initial = parseInt(message);
            trade_result = trade_initial + trade_amount +(trade_times - 1) * trade_step;
            trade_status = "";
            await ctx.reply('Buy of BTC ' + trade_result);
            break;
        case 'SELL_BUTTON_BTC_TIMES':
            trade_times = parseInt(message);
            if(trade_times >5 || trade_times < 3) {
                trade_status = "SELL_BUTTON_BTC_TIMES";
                await ctx.reply('Please type how many times you want to trade from 3 to 5 correctly.');
            }
            else{
                trade_status = "SELL_BUTTON_BTC_AMOUNT";
                await ctx.reply('Please Type the amount of BTC you want to sell.');
            }
            break;
        case 'SELL_BUTTON_BTC_AMOUNT':
            console.log('test2')
            trade_amount = parseInt(message);
            trade_status = "SELL_BUTTON_BTC_STEP";
            await ctx.reply('Please Type the Increments of BTC you want.');
            break;
        case 'SELL_BUTTON_BTC_STEP':
            trade_step = parseInt(message);
            trade_status = "SELL_BUTTON_BTC_INITIAL";
            await ctx.reply('Please Type the Initial price of BTC you want.');
            break;
        case 'SELL_BUTTON_BTC_INITIAL':
            trade_initial = parseInt(message);
            trade_result = trade_initial - trade_amount - (trade_times - 1) * trade_step;
            trade_status = "";
            await ctx.reply('Sell of BTC ' + trade_result);
            break;
        default :
            trade_status = "";
            trade_times = 0, trade_amount = 0, trade_initial = 0, trade_step = 0, trade_result = 0;
    }
})

bot.launch()