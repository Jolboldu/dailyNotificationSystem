import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import {UserModule} from '../telegramUser/user.module'

@Module({
  imports: [UserModule],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}