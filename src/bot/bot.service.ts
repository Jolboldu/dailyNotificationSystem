import { Injectable } from '@nestjs/common';
const TelegramBot = require('node-telegram-bot-api');
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from "../telegramUser/user.service";


@Injectable()
export class BotService {
  token : string;
  bot: any;
  constructor(private userService: UserService)
  {
    this.token = '1435322957:AAEqCTQ5BS5a_AW4xxrXtnFEyjg38HLvxGo';
    this.bot = new TelegramBot(this.token, { polling: true });
  }

  async botMessage() {        
    this.bot.on('message', async (msg:any) => {
        let start = "/start";
        if (msg.text.toString().toLowerCase().indexOf(start) === 0) 
        {
            
            //check if user exists
            let user = await this.userService.findUser(msg.from.username);

            if(user)
            {
              this.bot.sendMessage(msg.from.id, "Hello " + msg.from.first_name + " long time no see you");

            }
            else
            {
              //save user
              this.userService.createUser(msg.from);
              //say hello
              this.bot.sendMessage(msg.from.id, "Hello " + msg.from.first_name + " what would you like to know about me ?");
            }
        }  
    })
  }

  botSendToUser(id:string) {        
    this.bot.sendMessage(id, "Боб ты просто лучший");
    return "message sended";
  }

}