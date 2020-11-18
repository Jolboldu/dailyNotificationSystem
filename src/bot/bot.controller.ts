import { Controller, Get, Res, HttpStatus} from '@nestjs/common';
import { BotService } from './bot.service';

@Controller()

export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get()
  getBotDialog(@Res() res) {
    this.botService.botMessage();
    res.status(HttpStatus.OK).send("Bot service started");
  }

}
