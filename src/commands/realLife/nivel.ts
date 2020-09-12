import * as Discord from 'discord.js';
import db from '../../database/connection';
interface iNewUser {
  id: number;
  name?: any;
  avatar?: string
}


export default class Nivel {
  private client: Discord.Client = new Discord.Client()

  user: iNewUser
  constructor(msg: any) {
    this.user = {
      id: parseInt(msg.author.id),
      name: msg.author.username,
      avatar: msg.author.displayAvatarURL(),
    };
  }

  private async upUser() {
    const xp = await db.select('xp')
      .from('users')
      .where('id', this.user.id)
      .then(async (xpValue) => {
        const xpToNumber = parseInt(xpValue[0].xp)
        if (xpToNumber > 990) {
          const newXp = await db.select('xp')
            .from('users')
            .where('id', this.user.id)
            .update({xp: 0})
            .then(async () => {
              const Level = await db.select('level')
                .from('users')
                .where('id', this.user.id)
                .then(async (levelValue) => {
                  const levelToNumber = parseInt(levelValue[0].level) + 1
                  const newLevel = await db.select('level')
                    .from('users')
                    .where('id', this.user.id)
                    .update({level: levelToNumber})
                    .then(() => {
                      const levelEmbed = new Discord.MessageEmbed()
                        .setColor(0xff0000)
                        .setTitle('Parabens!')
                        .setDescription(`Você passou para o nivel: ${levelToNumber}`)
                        .setFooter(
                          "Itachi Flamenguista Bot",
                          "https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg"
                        );
                    })
                })
            })
        } else {
          const newXpValue = xpToNumber + 10
          const newXp = await db.select('xp')
            .from('users')
            .where('id', this.user.id)
            .update({xp: newXpValue})
            .then(() => {console.log(`xp para ${this.user.name}`)})
        }
      })
    

  }


  public async getUser() {
    const query = await db.from('users')
      .select('id')
      .where('id', this.user.id)
      .then(async () => this.upUser())
  }
}