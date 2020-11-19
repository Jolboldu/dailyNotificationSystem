import { Injectable, CACHE_MANAGER, Inject, OnModuleInit} from '@nestjs/common';
const TelegramBot = require('node-telegram-bot-api');
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from "../telegramUser/user.service";
import {Cache} from 'cache-manager'
const crypto = require('crypto');


@Injectable()
export class BotService {
  token : string;
  bot: any;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private userService: UserService, )
  {
    this.token = '1435322957:AAEqCTQ5BS5a_AW4xxrXtnFEyjg38HLvxGo';
    this.bot = new TelegramBot(this.token, { polling: true });
  }
  
  onModuleInit() {
    this.botMessage();
  }
    
  async botMessage() {        
    this.bot.on('message', async (msg:any) => {
        let start = "/start";
        
        let myInfo = "/me";

        if (msg.text.toString().toLowerCase().indexOf(start) === 0) 
        {
            console.log(msg.from);
            //check if user exists
            let user = await this.userService.findUser(msg.from.id);

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
        else if(msg.text.toString().toLowerCase().indexOf(myInfo) === 0)
        {

          let user = await this.userService.findUser(msg.from.id);
          
          //creates hash of (user + random number)
          let random = Math.floor(Math.random() * 1000);     // returns a random integer from 0 to 9999
          let username = user.id + random;
         
          
          try{
            const hash = crypto.createHash('sha256');

            let key = await hash.update(String(random+username)).digest('hex');

          //writes this hash to cache
          await this.cacheManager.set(key, user, { ttl: 10000 });

          this.bot.sendMessage(user.id, "this is your key(hash) " + key);
          }
          catch(e)
          {
            console.log(e);
          }
        }

    })
  }
}