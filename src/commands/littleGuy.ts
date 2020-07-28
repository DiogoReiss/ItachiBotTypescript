import * as Discord from 'discord.js';
import * as path from 'path';

export default class LittleGuy {
  private client: Discord.Client = new Discord.Client()

  littleGuyImage: any
  constructor() {
    this.littleGuyImage = Math.floor((Math.random() * 21) + 1);
    if (this.littleGuyImage < 10) {
      this.littleGuyImage = `0${this.littleGuyImage}`
    }
  }


  sendLittleGuyImage(msg: any) {
    const littleGuyEmbed = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTitle('Eu ouvi anão?')
      .setImage(`https://raw.githubusercontent.com/DiogoReiss/ItachiFlamenguistaBot/master/data/littleGuysImages/0${this.littleGuyImage}.jpg`)
      .setFooter('ITACHI FLAMENGUISTA GARAI', "https://pbs.twimg.com/media/EHm2zoIXUAI0ttU.jpg")
      .setTimestamp()
    msg.channel.send(littleGuyEmbed);
  }
}