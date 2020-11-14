import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User} from './database/user.schema';
import { Model } from 'mongoose';
import {CreateUserDto} from '../dto/create-user.dto'
@Injectable()
export class UserService {
  
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>){};
 
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

  async findUser(newUsername:string): Promise<User>
  {
    try
    {
      let user;
      user = await this.userModel.findOne({username:newUsername});
      return user;
    }
    catch(e)
    {
      console.log(e);
    }
  }

}