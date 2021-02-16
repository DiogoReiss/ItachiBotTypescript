import { Client } from 'discord.js';
import {config} from 'dotenv';

config()


const bot = new Client();

bot.on('ready', () => {
  console.log(`To on com a tag: ${bot.user.tag}`)
})

bot.on('message', message => {
  if ( message.content === 'ping') {
    message.reply('miapica')
  }
});

bot.login(process.env.TOKEN);