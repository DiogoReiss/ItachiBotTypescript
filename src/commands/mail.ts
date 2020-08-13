import * as Discord from 'discord.js';


export default class PrivateMail {
  private client: Discord.Client = new Discord.Client()


  constructor() {

  }
  requestPrivateMail() {

    this.sendMail()

    console.log('Mail send sucessfully')
  }

  private sendMail() {
    this.getReceiver();
    console.log('We have a receiver');
    console.log('Sending a mail')
  }

  private getReceiver() {
    console.log('Getting a mail receiver')

  }
}



const mail = new PrivateMail();

mail.requestPrivateMail()