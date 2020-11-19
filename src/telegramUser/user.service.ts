import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User} from './database/user.schema';
import {UserNotification} from './database/userNotifications.schema'
import { Model } from 'mongoose';
import {CreateUserDto} from '../dto/create-user.dto'
@Injectable()
export class UserService {
  
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
              @InjectModel(UserNotification.name) private readonly userNotificationModel: Model<User>)
  {};
 
  createUser(data: CreateUserDto): void
  {
    try
    {
      let newUser = new this.userModel(data);
      newUser.save();
    }
    catch(e)
    {
      console.log(e);
    }
  }

  async findUser(tmpId:number): Promise<User>
  {
    try
    {
      let user;
      user = await this.userModel.findOne({id:tmpId});
      return user;
    }
    catch(e)
    {
      console.log(e);
    }
  }

  async findNotification(tmpUserId:number): Promise<UserNotification>
  {
    try
    {
      let notification;
      notification = await this.userNotificationModel.findOne({userId:tmpUserId});
      return notification;
    }
    catch(e)
    {
      console.log(e);
    }
  }

  async createNotification(newMessage:string, newUserId:number, newTime:string): Promise<boolean>
  {
    try
    {
      let lastNotification = await this.findNotification(newUserId);
      if(lastNotification)
        throw 'there is already notification';
      
      let notification =  new this.userNotificationModel({userId:newUserId, message:newMessage, time:newTime});
      await notification.save();
      return true;
    }
    catch(e)
    {
      console.log(e);
      return false;
    }
  }

  async updateNotification(newMessage:string, newUserId:number, newTime:string): Promise<boolean>
  {
    try
    {
      let lastNotification = await this.findNotification(newUserId);
      if(lastNotification === undefined)
        throw 'there is already notification';
      
      let notification =  new this.userNotificationModel({userId:newUserId, message:newMessage});
      await this.userNotificationModel.findOneAndUpdate(
        {userId: newUserId}, {userId:newUserId, message:newMessage,time:newTime}
        )
      return true;
    }
    catch(e)
    {
      console.log(e);
      return false;
    }
  }
  async findNotificationsByTime(tmpTime:string): Promise<[UserNotification]>
  {
    try
    {
      let notification;
      notification = await this.userNotificationModel.find({time:tmpTime});
      return notification;
    }
    catch(e)
    {
      console.log(e);
    }
  }
}