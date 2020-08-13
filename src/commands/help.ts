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
        { name: ':loudspeaker: Nosso prefixo', value: 'O prefixo do nosso bot é: i., exemplo: i.comando' },
        { name: ':eyes: i.anao', value: 'tenha cuidado ao invocar esse cantigo, iremos reviver um anão no chat!' },
        { name: ':microphone2: i.bot', value: 'temos um vasto estoque de indianos gentis que irão te responder na hora!' },
        { name: ':credit_card: i.loja', value: 'entre no nosso mercado e gaste seus dinheiros :3' },
        { name: ':euro: i.banco', value: 'o itachi copiou o kakuzo e ficou louco por dinheiro, você pode guardar o seu com ele' },
        { name: ':wrench: EM CONSTRUÇÃO', value: 'Nosso incrivel e amado mestre está desenvolvendo um incrivel minigame' }
      )
      .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
  }

  sendHelpMessage(msg: any) {
    return msg.channel.send(this.helpMessage)
  }
}