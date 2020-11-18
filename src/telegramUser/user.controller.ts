import { Controller, Get, Post, Put, Param, Inject, CACHE_MANAGER, Body} from '@nestjs/common';
import { UserService } from './user.service';
import {Cache} from 'cache-manager'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('/user/:hash')
  async getUser(@Param('hash') hash: string): Promise<any> {
    let user = await this.cacheManager.get(hash);
    return user;
  }

  @Put('/user/:hash')
  async updateUserNotification(@Param('hash') hash: string, @Body() data:{message:string}): Promise<any> {
    let user = await this.cacheManager.get(hash);
    let isSaved = await this.userService.updateNotification(data.message, user.id);
    return isSaved;
  }

  @Post('/user/:hash')
  async createUserNotification(@Param('hash') hash: string, @Body() data:{message:string}): Promise<any> {
    let user = await this.cacheManager.get(hash);
    let isSaved = await this.userService.createNotification(data.message, user.id);
    return isSaved;

  }

}
