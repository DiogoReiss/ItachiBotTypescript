import { DiscordBot } from './DiscordBot';

require('dotenv').config();

const bot = DiscordBot.getInstace();

bot.connect();