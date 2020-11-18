import { Module, CacheModule } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import {UserModule} from '../telegramUser/user.module'

@Module({
  imports: [UserModule, CacheModule.register()],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}