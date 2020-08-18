import * as Discord from 'discord.js';
import db from '../../database/connection';
interface newUser {
  id: number
  name: any
  avatar: string
}

export default class Shop {
  private client: Discord.Client = new Discord.Client()

  command: any
  args: any
  user: newUser
  amount: any
  constructor(msg: any) {
    this.user = {
      id: parseInt(msg.author.id),
      name: msg.author.username,
      avatar: msg.author.displayAvatarURL()
    }
    this.args = msg.content.slice(`${process.env.PREFIX}`.length).trim().split(/ +/)
    this.command = this.args.shift().toLowerCase();
  }



  showShop(msg: any) {
    const shopEmbed = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTitle('Nossa lojinha <3')
      .setThumbnail('https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista2.jpeg')
      .addFields(
        { name: ':package: i.loja mochila', value: 'Compre uma mochila para guardar seus itens!' },
        { name: ':gun: i.loja arma', value: 'Compre sua arminha para roubar seu amigo agora!' },
        { name: ':seedling: i.loja maconha', value: 'Compre suas sementinhas e plante no seu terreno para ganhar dinheiros!' },
        { name: ':beach: i.loja terreno', value: 'Compre mais espaços no seu terreno para plantar mais sementes!' }
      )
      .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')

    switch (this.args[0]) {
      case 'mochila': {
        this.buyInventory(msg);
        console.log(`${msg.author.username} quer comprar uma mochila`)

        break;
      }
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
        this.buyTerrain(msg);
        console.log(`${msg.author.username} quer melhorar o seu terreno`)
        break;
      }
      default: {
        msg.channel.send(shopEmbed);
        break;
      }
    }
  }

  private async buyInventory(msg: any) {
    const Inventory = db.select('id')
      .from('user_inventory')
      .where('user_id', this.user.id)
      .then(async (inventory) => {
        if (inventory.length === 0) {
          const balance = await db.select('money')
            .from('users')
            .where('id', this.user.id)
            .then(async (handBalance) => {
              const HandBalance = handBalance[0].money
              console.log(HandBalance)
              if (HandBalance > 1500) {
                const newHandBalance = HandBalance - 1500
                const newBalance = await db.select('money')
                  .from('users')
                  .where('id', this.user.id)
                  .update({ money: newHandBalance })
                  .then(async () => {
                    const newInventory = await db('user_inventory')
                      .insert([{
                        user_id: this.user.id
                      }])
                      .then(() => {
                        console.log(`A new inventory to a new user `)
                        const inventoryEmbed = new Discord.MessageEmbed()
                          .setColor(0xff0000)
                          .setTitle('Lojinha zé Itachi')
                          .setDescription('Obrigado por comprar sua mochila, volte sempre!')
                          .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                        msg.channel.send(inventoryEmbed)
                      }).catch(err => {
                        console.error(err);

                      })
                  })
              } else {
                const wrongAmount = new Discord.MessageEmbed()
                  .setColor(0xff0000)
                  .setTitle('Lojinha zé Itachi')
                  .setDescription('Você não tem tanto dinheiro assim!')
                  .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')

              }
            })
        } else {
          const inventoryAlreadyExists = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle('Lojinha zé Itachi')
            .setDescription('Você já tem uma mochila :(')
            .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
          msg.channel.send(inventoryAlreadyExists)
        }
      })

  }

  private async buyTerrain(msg: any) {
    switch (this.args[1]) {
      case '1': {
        const balance = await db.select('money')
          .from('users')
          .where('id', this.user.id)
          .then(async (handBalance) => {
            const balanceToNumber = handBalance[0].money
            const newHandBalance = balanceToNumber - 4000
            if (balanceToNumber > 4000) {
              const newTerrain = await db.select('terrain_level')
                .from('user_terrain')
                .where('terrain_owner', this.user.id)
                .then(async (haveTerrain) => {
                  if (haveTerrain.length === 0) {
                    const newBalance = await db.select('money')
                      .from('users')
                      .where('id', this.user.id)
                      .update({ money: newHandBalance })
                      .then(async () => {
                        const newTerrain = await db('user_terrain')
                          .insert([{
                            terrain_level: 1,
                            terrain_owner: this.user.id
                          }]).then(async () => {
                            const updatingInventory = await db.select('terrain')
                              .from('user_inventory')
                              .where('user_id', this.user.id)
                              .update({ terrain: 1 });

                            const newTerrainEmbed = new Discord.MessageEmbed()
                              .setColor(0xff0000)
                              .setTitle('Lojinha zé Itachi')
                              .setDescription('Obrigado por comprar seu terreno, volte sempre!')
                              .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                            msg.channel.send(newTerrainEmbed)
                          })
                      })
                  } else {
                    const terrainExists = new Discord.MessageEmbed()
                      .setColor(0xff0000)
                      .setTitle('Lojinha zé Itachi')
                      .setDescription('Você já tem um terreno com level 1 ou superior!')
                      .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                    msg.channel.send(terrainExists)
                  }
                })


            }
          })
        break;
      }
      case '2': {
        const balance = await db.select('money')
          .from('users')
          .where('id', this.user.id)
          .then(async (handBalance) => {
            const balanceToNumber = handBalance[0].money
            const newHandBalance = balanceToNumber - 8000
            if (balanceToNumber > 8000) {
              const newTerrain = await db.select('terrain_level')
                .from('user_terrain')
                .where('terrain_owner', this.user.id)
                .then(async (haveTerrain) => {
                  if (haveTerrain.length === 0 || haveTerrain[0].terrain_level < 2) {
                    const newBalance = await db.select('money')
                      .from('users')
                      .where('id', this.user.id)
                      .update({ money: newHandBalance })
                      .then(async () => {
                        const newTerrain = await db('user_terrain')
                          .insert([{
                            terrain_level: 2,
                            terrain_owner: this.user.id
                          }]).then(async () => {
                            const updatingInventory = await db.select('terrain')
                              .from('user_inventory')
                              .where('user_id', this.user.id)
                              .update({ terrain: 2 });

                            const newTerrainEmbed = new Discord.MessageEmbed()
                              .setColor(0xff0000)
                              .setTitle('Lojinha zé Itachi')
                              .setDescription('Obrigado por comprar seu terreno, volte sempre!')
                              .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                            msg.channel.send(newTerrainEmbed)
                          })
                      })
                  } else {
                    const terrainExists = new Discord.MessageEmbed()
                      .setColor(0xff0000)
                      .setTitle('Lojinha zé Itachi')
                      .setDescription('Você já tem um terreno com level 2 ou superior!')
                      .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                    msg.channel.send(terrainExists)
                  }
                })
            }
          })
        break;
      }
      case '3': {
        const balance = await db.select('money')
          .from('users')
          .where('id', this.user.id)
          .then(async (handBalance) => {
            const balanceToNumber = handBalance[0].money
            const newHandBalance = balanceToNumber - 12000
            if (balanceToNumber > 12000) {
              const newTerrain = await db.select('terrain_level')
                .from('user_terrain')
                .where('terrain_owner', this.user.id)
                .then(async (haveTerrain) => {
                  if (haveTerrain.length === 0 || haveTerrain[0].terrain_level < 3) {
                    const newBalance = await db.select('money')
                      .from('users')
                      .where('id', this.user.id)
                      .update({ money: newHandBalance })
                      .then(async () => {
                        if (haveTerrain.length === 0) {
                          const newTerrain = await db('user_terrain')
                            .insert([{
                              terrain_level: 3,
                              terrain_owner: this.user.id
                            }]).then(async () => {
                              const updatingInventory = await db.select('terrain')
                                .from('user_inventory')
                                .where('user_id', this.user.id)
                                .update({ terrain: 3 });
                            })

                          const newTerrainEmbed = new Discord.MessageEmbed()
                            .setColor(0xff0000)
                            .setTitle('Lojinha zé Itachi')
                            .setDescription('Obrigado por comprar seu terreno, volte sempre!')
                            .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                          msg.channel.send(newTerrainEmbed)
                        }
                        if (haveTerrain[0].terrain_level < 3) {
                          const newTerrain = await db.select('terrain_level')
                            .from('user_terrain')
                            .where('terrain_owner', this.user.id)
                            .update({ terrain_level: 3 })
                            .then(async () => {
                              const updatingInventory = await db.select('terrain')
                                .from('user_inventory')
                                .where('user_id', this.user.id)
                                .update({ terrain: 3 });

                            })

                          const newTerrainEmbed = new Discord.MessageEmbed()
                            .setColor(0xff0000)
                            .setTitle('Lojinha zé Itachi')
                            .setDescription('Obrigado por comprar seu terreno, volte sempre!')
                            .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                          msg.channel.send(newTerrainEmbed)
                        }
                      })
                  } else {
                    const terrainExists = new Discord.MessageEmbed()
                      .setColor(0xff0000)
                      .setTitle('Lojinha zé Itachi')
                      .setDescription('Você já tem um terreno com level 3!')
                      .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                    msg.channel.send(terrainExists)
                  }
                })
            }
          })
        break;
      }
      default: {
        const wrongLevel = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setTitle('Lojinha zé Itachi')
          .setDescription('Não temos terreno desse nivel!')
          .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
        break;
      }
    }
  }
}