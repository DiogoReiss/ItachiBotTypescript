import * as Discord from 'discord.js';
import './commands/littleGuy';
import './commands/cuteGreeting';
import Greeting from './commands/cuteGreeting';
import LittleGuy from './commands/littleGuy';
import Register from './commands/realLife/register'
import commandList from './commands/help';
import Shop from './commands/realLife/shop';
import Banco from './commands/realLife/bank'


export class DiscordBot {
  private static instance: DiscordBot;

  private client: Discord.Client = new Discord.Client()

  private constructor() {
    this.initializeClient();
  }

  static getInstace(): DiscordBot {
    if (!DiscordBot.instance) {
      DiscordBot.instance = new DiscordBot();
    }
    return DiscordBot.instance;
  }

  connect(): void {
    this.client
      .login(process.env.TOKEN)
      .then(_ => console.log('to on garai'))
      .catch(error =>
        console.error(`Não consegui entrar ;-;. Error: ${error.message}`)
      );
  }

  private initializeClient(): void {
    if (!this.client) return;

    this.setReadyHandler();
    this.setMessageHandler();
  }

  private setReadyHandler(): void {
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user?.tag}!`)
    });
  };

  private setMessageHandler(): void {
    this.client.on('message', async (msg: Discord.Message) => {
      //Return nothing if the message's author is a Bot
      if (msg.author.bot) return;

      if (msg.content === "ping") {
        await msg.reply('Pong safado');
        console.log(msg.content)
      }

      if (msg.content.startsWith(`${process.env.PREFIX}`)) {
        if (msg.content.startsWith(`${process.env.PREFIX}bot`)) {
          let message = new Greeting(msg);
          console.log(`${msg.author.username} ${msg.channel.id} ${msg.guild?.name}`)
          return message;
        }
        if (msg.content.startsWith(`${process.env.PREFIX}anao`)) {
          let littleGuyMessage = new LittleGuy()
          console.log(`O corno do ${msg.author.username} pediu uma foto de anão no server ${msg.guild?.name}`)

          return littleGuyMessage.sendLittleGuyImage(msg);
        }
        if (msg.content.startsWith(`${process.env.PREFIX}ademy`)) {
          console.log('corsinha preto tunado');
          msg.channel.send('uiuiuiui corsinha preto tunado ademir egrilo coisa mais linda')
        }
        if (msg.content.startsWith(`${process.env.PREFIX}karol`)) {
          console.log('karol é gata!');
          msg.channel.send('Karolzitcha é gata p krl <3')
        }
        if (msg.content.startsWith(`${process.env.PREFIX}registrar`)) {
          let newUser = new Register(msg)
          console.log(newUser.user.name);
          console.log(newUser.user.avatar);

          return newUser.sendNewUserMessage(msg)
        }
        if (msg.content.startsWith(`${process.env.PREFIX}ajuda`)) {
          const helpMsg = new commandList();
          return helpMsg.sendHelpMessage(msg);
        }
        if (msg.content.startsWith(`${process.env.PREFIX}loja`)) {

          const shop = new Shop(msg);

          return shop.showShop(msg);
        }
        if (msg.content.startsWith(`${process.env.PREFIX}banco`)) {
          const bank = new Banco(msg)

          return bank.showBank(msg);
        }

        /*else {
          const wrongCommandEmbed = new Discord.MessageEmbed()
            .setTitle('Comando Errado parceiro!')
            .setColor(0xff0000)
            .setDescription('Em breve o comando i.help estará pronto oferecendo uma lista de comandos!')
            .setFooter('ITACHI FLAMENGUISTA GARAI', "https://pbs.twimg.com/media/EHm2zoIXUAI0ttU.jpg")

          msg.channel.send(wrongCommandEmbed)
          console.log(`O ${msg.author.username} mandou um comando errado ${msg.guild?.name}`)
        }
      */}
    })
  }
}