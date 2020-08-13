import * as Discord from 'discord.js';
import db from '../../database/connection';
interface newUser {
  id: number;
  name: any;
  avatar: string
}

export default class Register {
  private client: Discord.Client = new Discord.Client()

  user: newUser
  constructor(msg: any) {
    this.user = {
      id: parseInt(msg.author.id),
      name: msg.author.username,
      avatar: msg.author.displayAvatarURL()
    }
  }
  async sendNewUserMessage(msg: any) {
    const newUserEmbed = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTitle(`Bem vindo, ${this.user.name}`)
      .setDescription('Como eu sou bonzinho você já tem 10k para gastar na nossa loja!')
      .setThumbnail(this.user.avatar)

    const UserExists = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTitle(`Aconteceu um errinho aqui :(`)
      .setDescription('Dei uma pesquisada aqui no meu banco de dados e você já está registrado!')

    const newUser = await db.select('name')
      .from('users')
      .where('name', this.user.name)
      .andWhere('avatar', this.user.avatar)
      .then(userAlreadyExists => {
        if (userAlreadyExists.length === 0) {
          return db('users')
            .insert([{
              id: this.user.id,
              name: this.user.name,
              avatar: this.user.avatar
            }])
            .then((newUserID) => {
              console.log('inserted user', newUserID)
              msg.channel.send(newUserEmbed)
            });

        } else {
          console.log('já existe!')
          console.log(userAlreadyExists)

          return msg.channel.send(UserExists)
        }
      })
  }
}

