import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BotModule} from './bot/bot.module';
import { MongooseModule } from '@nestjs/mongoose';
import {UserModule} from './telegramUser/user.module'
@Module({
  imports: [BotModule, MongooseModule.forRoot('mongodb://localhost/dailyNS', { useFindAndModify: false }), 
            UserModule
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
