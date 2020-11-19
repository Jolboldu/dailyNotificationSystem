import { Module, CacheModule} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from './database/user.schema';
import {UserNotification, UserNotificationSchema} from './database/userNotifications.schema'
@Module({
  imports: [MongooseModule.forFeature(
        [
          {name: User.name, schema: UserSchema},
          {name: UserNotification.name, schema: UserNotificationSchema},

        ],
      ),
      CacheModule.register()
    ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}