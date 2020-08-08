import * as Discord from 'discord.js';
import db from '../../database/connection';
interface newUser {
  name: any;
  avatar: string
}

export default class Register {
  private client: Discord.Client = new Discord.Client()

  user: newUser
  constructor(msg: any) {
    this.user = {
      name: msg.author.username,
      avatar: msg.author.displayAvatarURL()
    }
  }
  async sendNewUserMessage(msg: any) {
    const newUserEmbed = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTitle(`Bem vindo, ${this.user.name}`)
      .setDescription('Como eu sou bonzinho você já tem 5k para gastar na nossa loja!')
      .setThumbnail(this.user.avatar)

    const UserExists = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTitle(`Você já Existe, ${this.user.name}!`)

    const newUser = await db.select('name')
      .from('users')
      .where('name', this.user.name)
      .then(userAlreadyExists => {
        if (userAlreadyExists.length === 0) {
          return db('users')
            .insert([{
              name: this.user.name,
              avatar: this.user.avatar
            }])
            .then((newUserName) => {
              console.log('inserted user', newUserName)
              msg.channel.send(newUserEmbed)
            });

        } else {
          console.log('já existe!')

          return msg.channel.send(UserExists)
        }
      })
  }
}

