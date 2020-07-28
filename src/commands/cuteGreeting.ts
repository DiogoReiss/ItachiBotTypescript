import * as Discord from 'discord.js';
import Data from '../../public/greetings';

export default class Greeting {
  private client: Discord.Client = new Discord.Client()

  messageGreeting: string;
  constructor(msg: any) {
    const randomGreeting = Data[Math.floor(Math.random() * Data.length)];
    this.messageGreeting = randomGreeting;

    this.sendGreeting(msg)
  }


  sendGreeting(msg: any) {
    const msgGreet = this.messageGreeting

    return msg.channel.send(msgGreet)
  }
}
