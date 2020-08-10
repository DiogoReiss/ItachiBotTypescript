import * as Discord from 'discord.js';


export default class Shop {
  private client: Discord.Client = new Discord.Client()

  command: any
  args: any
  constructor(msg: any) {

    this.args = msg.content.slice(`${process.env.PREFIX}`.length).trim().split(/ +/)
    this.command = this.args.shift().toLowerCase();


  }

  showShop(msg: any) {
    const shopEmbed = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTitle('Nossa lojinha <3')
      .setThumbnail('https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista2.jpeg')
      .addFields(
        { name: ':gun: i.loja arma', value: 'Compre sua arminha para roubar seu amigo agora!' },
        { name: ':seedling: i.loja maconha', value: 'Compre suas sementinhas e plante no seu terreno para ganhar dinheiros!' },
        { name: ':beach: i.loja terreno', value: 'Compre mais espaços no seu terreno para plantar mais sementes!' }
      )
      .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')

    switch (this.args[0]) {
      case 'arma': {
        //buyGun(msg);
        console.log(`${msg.author.username} quer comprar uma arma`)
        break;
      }
      case "maconha": {
        //buyWeed(msg);
        console.log(`${msg.author.username} quer comprar um cigarrinho do diabo`)
        break;
      }
      case "terreno": {
        //buyTerrain(msg);
        console.log(`${msg.author.username} quer melhorar o seu terreno`)
        break;
      }
      default: {
        msg.channel.send(shopEmbed);
        break;
      }
    }

    console.log(this.args)
  }
}