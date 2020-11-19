import { Controller, Get, Res, HttpStatus} from '@nestjs/common';
import { BotService } from './bot.service';
import { Cron } from '@nestjs/schedule';
import { UserService } from "../telegramUser/user.service";

@Controller()

export class BotController {
  constructor(private readonly botService: BotService, private readonly userService: UserService) {}

  // @Get('/bot/turnon')
  // getBotDialog(@Res() res) {
  //   this.botService.botMessage();
  //   res.status(HttpStatus.OK).send("Bot service started");
  // }

  //execute procedure every minute 
  @Cron('31 * * * * *')
  async handleCron() {
    let now = new Date;
    let hours = String(now.getHours());
    let minutes = String(now.getMinutes());

    if(hours.length == 1)
      hours = "0" + hours;
    
    if(minutes.length == 1)
      minutes = "0" + minutes
    
    let time = hours + ":" + minutes;

    console.log(time)

    //search database for time
    let notification = await this.userService.findNotificationsByTime(time);
    try
    {
      //send notification
      for(let i = 0; i < notification.length; ++i)
      {
        this.botService.sendNotification(notification[i].userId, notification[i].message)
      }
    }
    catch(e)
    {
      console.log(e);
    }
    
  }
}
