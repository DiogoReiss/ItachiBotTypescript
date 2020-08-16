import * as Discord from 'discord.js';
import db from '../../database/connection';
interface newUser {
  id: number
  name: any
  avatar: string
}


export default class Banco {
  private client: Discord.Client = new Discord.Client()

  command: any
  args: any
  user: newUser
  constructor(msg: any) {
    this.user = {
      id: parseInt(msg.author.id),
      name: msg.author.username,
      avatar: msg.author.displayAvatarURL()
    }


    this.args = msg.content.slice(`${process.env.PREFIX}`.length).trim().split(/ +/)
    this.command = this.args.shift().toLowerCase();


  }

  async showBank(msg: any) {
    switch (this.args[0]) {
      case 'saldo': {
        this.showBalance(msg)
        break;
      }
      case 'depositar': {
        this.depositMoney(msg)
        break;
      }

      case 'transferir': {
        this.transferMoney(msg)
        break;
      }

      case 'sacar': {
        this.drawOutMoney(msg)
        break;
      }

      default: {

        const wrongCommand = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setTitle('O pai aqui não tem essa opção')
          .setThumbnail('https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista2.jpeg')
          .addFields(
            { name: 'i.banco saldo', value: 'Magicamente o seu saldo irá aparecer no chat' },
            { name: 'i.banco depositar EM CONSTRUÇÃO', value: 'deposite seu lindo dinheirinho no banco' },
            { name: 'i.banco sacar EM CONSTRUÇÃO', value: 'saque seu lindo dinheirinho do seu banco' },
            { name: 'i.banco transferir EM CONSTRUÇÃO', value: 'mande um dinheiros para aquele seu amigo' }
          )
          .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')


        msg.channel.send(wrongCommand)
        break;
      }
    }
  }

  private async showBalance(msg: any) {
    const balance = await db.select('money')
      .from('users')
      .where('id', this.user.id)
      .then(balanceValue => {
        const money: number = balanceValue[0].money

        const bankBalance = db.select('money_bank')
          .from('users')
          .where('id', this.user.id)
          .then((BankBalance) => {
            const bankMoney: number = BankBalance[0].money_bank;

            const bankEmbed = new Discord.MessageEmbed()
              .setColor(0xff0000)
              .setTitle('Banco Uchiha: Feito para você!')
              .setThumbnail('https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista2.jpeg')
              .setDescription('Esse aqui é o seu saldo, bebê s2')
              .addFields(
                { name: ':money_with_wings: Dinheiro na mão', value: `:dollar: R$${money}` },
                { name: ':moneybag: Dindin no banco', value: `:dollar: R$${bankMoney}` }
              )
              .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')

            msg.channel.send(bankEmbed);
          })

      })

  }

  private async depositMoney(msg: any) {
    const balance = await db.select('money')
      .from('users')
      .where('id', this.user.id)
      .then((balanceValue) => {
        const amount = this.args[1]
        var numberAmount = parseInt(amount)
        const BalanceValue: number = balanceValue[0].money
        if (amount > BalanceValue) {
          const errEmbed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle('Banco Uchiha: Sempre com você!')
            .addFields(
              {
                name: 'Ocorreu um erro :(',
                value: 'Infelizmente a quantia que você deseja depositar é superior à que você possue em mãos!'
              }
            )
            .setThumbnail('https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista2.jpeg')
            .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')

          msg.channel.send(errEmbed)
        } else {
          const reference = db.select('money')
            .from('users')
            .where('id', this.user.id)
            .then(async (handAmount) => {
              const handMoney: number = handAmount[0].money
              if (amount === 'all') {
                numberAmount = handMoney
              }
              const totalAmount = handMoney - numberAmount
              const deposit = await db.select('money_bank')
                .from('users')
                .where('id', this.user.id)
                .then(async (amountToDeposit) => {
                  const moneyBank = amountToDeposit[0].money_bank
                  const newMoneyBank = (parseInt(moneyBank) + numberAmount)
                  const newAmount = await db.select('money_bank')
                    .from('users')
                    .where('id', this.user.id)
                    .update({ money_bank: newMoneyBank })
                    .then(async () => {

                      const newHandMoney = await db.select('money')
                        .from('users')
                        .where('id', this.user.id)
                        .update({ money: totalAmount })
                        .then(() => {
                          const depositEmbed = new Discord.MessageEmbed()
                            .setColor(0xff0000)
                            .setTitle(':money_with_wings: Deposito realizado com sucesso!')
                            .setDescription('Para ver o seu saldo digite "i.banco saldo"')
                            .setThumbnail('https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista2.jpeg')
                            .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                          msg.channel.send(depositEmbed)
                        })
                    })
                    .catch((UnhandledPromiseRejectionWarning) => {
                      const wrongAmountEmbed = new Discord.MessageEmbed()
                        .setColor(0xff0000)
                        .setTitle('Digite uma quantia correta!')
                        .setDescription('Uma dicazinha, não utilize virgulas, pontos ou R$ por favor :) !')
                        .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                      msg.channel.send(wrongAmountEmbed)
                    })
                })


            })
        }
      })
  }

  private async drawOutMoney(msg: any) {
    const bankBalance = await db.select('money_bank')
      .from('users')
      .where('id', this.user.id)
      .then(async (BankBalance) => {
        const AmountToDraw = this.args[1]
        var amountNumber = parseInt(AmountToDraw)
        const BankAmount = parseInt(BankBalance[0].money_bank)
        if (AmountToDraw === 'all') {
          amountNumber = BankAmount
        }
        if (amountNumber > BankAmount) {
          const wrongAmount = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle('Banco Uchiha: Sempre com você!')
            .addFields(
              {
                name: 'Digite uma quantia correta!',
                value: 'Você não tem esse dinheiro todo no banco, amigão!'
              }
            )
            .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')

          msg.channel.send(wrongAmount)
        }

        const handBalance = await db.select('money')
          .from('users')
          .where('id', this.user.id)
          .then(async (HandBalance) => {
            const handBalance = HandBalance[0].money

            const newBankAmount = BankAmount - amountNumber
            const newHandAmount = handBalance + amountNumber

            const NewBankAmount = await db.select('money_bank')
              .from('users')
              .where('id', this.user.id)
              .update({ money_bank: newBankAmount })
              .then(async () => {
                const NewHandAmount = await db.select('money')
                  .from('users')
                  .where('id', this.user.id)
                  .update({ money: newHandAmount })

                const withdrawEmbed = new Discord.MessageEmbed()
                  .setColor(0xff0000)
                  .setTitle('Banco Uchiha: sempre com você!')
                  .addFields(
                    {
                      name: ':money_with_wings: Deposito realizado com sucesso!',
                      value: 'Para ver o seu saldo digite "i.banco saldo'
                    }
                  )
                  .setThumbnail('https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista2.jpeg')
                  .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                msg.channel.send(withdrawEmbed)

              }).catch((UnhandledPromiseRejectionWarning) => {
                const wrongAmountEmbed = new Discord.MessageEmbed()
                  .setColor(0xff0000)
                  .setTitle('Banco Uchiha: sempre com você!')
                  .addFields(
                    {
                      name: 'Digite uma quantia correta!',
                      value: 'Uma dicazinha, não utilize virgulas, pontos ou R$ por favor :) !'
                    }
                  )
                  .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                msg.channel.send(wrongAmountEmbed)
              })

          })

      })

  }

  private async transferMoney(msg: any) {
    const transferBankMoney = await db.select('money_bank')
      .from('users')
      .where('id', this.user.id)
      .then(async (bankBalance) => {
        const amount = this.args[1]
        const BankBalance = parseInt(bankBalance[0].money_bank)
        if (amount > BankBalance) {
          const wrongAmount = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle('Banco Uchiha: sempre com você!')
            .setDescription('Você não tem essa quantia toda no banco, amigão :(')
            .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
          msg.channel.send(wrongAmount)
        } else {
          var numberAmount = parseInt(amount)
          if (amount === 'all') {
            numberAmount = BankBalance
          }
          if (msg.mentions.users.size) {
            const member = await msg.mentions.users.first()
            const memberID = parseInt(member.id)
            if (msg.author.id === member.id) {
              const selfTransfer = new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setTitle('Banco Uchiha: sempre com você!')
                .setDescription('Você não pode transferir para si mesmo!')
                .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
              msg.channel.send(selfTransfer)
            } else {
              const userExist = await db.select('money_bank')
                .from('users')
                .where('id', memberID)
                .then(async (userBalance) => {
                  const UserBalance = parseInt(userBalance[0].money_bank)
                  const newUserBalance = UserBalance + numberAmount
                  const newTransferBalance = BankBalance - numberAmount
                  const newBalanceTransfer = await db.select('money_bank')
                    .from('users')
                    .where('id', this.user.id)
                    .update({ money_bank: newTransferBalance })
                    .then(async (anything) => {
                      const NewUserBalance = await db.select('money_bank')
                        .from('users')
                        .where('id', memberID)
                        .update({ money_bank: newUserBalance })
                        .then(async (bb) => {
                          const sucessfulyTransfer = new Discord.MessageEmbed()
                            .setColor(0xff0000)
                            .setTitle('Banco Uchiha: sempre com você!')
                            .addFields(
                              { name: 'Transferência concluida com sucesso! :)', value: 'Volte sempre!' }
                            )
                            .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                          msg.channel.send(sucessfulyTransfer)
                        })
                    })
                }).catch((er) => {
                  const userDontRegisted = new Discord.MessageEmbed()
                    .setColor(0xff0000)
                    .setTitle('Banco Uchiha: sempre com você!')
                    .addFields(
                      { name: 'Mencione o usuário correto!', value: 'Não encontramos esse usuário nos nossos registros :(' }
                    )
                    .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
                  msg.channel.send(userDontRegisted)
                  console.log(er)
                })

            }

          } else {
            const userDontExists = new Discord.MessageEmbed()
              .setColor(0xff0000)
              .setTitle('Não encontrei esse membro no nosso servidor :( ')
              .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')
            msg.channel.send(userDontExists)
          }
        }

      })
  }
}