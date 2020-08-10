import * as Discord from 'discord.js'


export default class CommandList {
  private client: Discord.Client = new Discord.Client()

  helpMessage: any
  constructor() {
    this.helpMessage = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTitle('Lista de Comandos')
      .setAuthor('Itachi Flamenguista')
      .setDescription('Ouvi que alguem pediu uma ajuda aqui')
      .setThumbnail('https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista2.jpeg')
      .addFields(
        { name: 'Nosso prefixo', value: 'O prefixo do nosso bot é: i., exemplo: i.comando' },
        { name: 'i.anao', value: 'tenha cuidado ao invocar esse cantigo, iremos reviver um anão no chat!' },
        { name: 'i.bot', value: 'temos um vasto estoque de indianos gentis que irão te responder na hora!' },
        { name: 'EM CONSTRUÇÃO', value: 'Nosso incrivel e amado mestre está desenvolvendo um incrivel minigame' }
      )
      .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
  }

  sendHelpMessage(msg: any) {
    return msg.channel.send(this.helpMessage)
  }
}