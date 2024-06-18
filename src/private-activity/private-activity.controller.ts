import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, HttpException } from '@nestjs/common';
import { PrivateActivityService } from './private-activity.service';
import { CreatePrivateActivityDto } from './dto/create-private-activity.dto';
import { UpdatePrivateActivityDto } from './dto/update-private-activity.dto';

@Controller('private-activity')
export class PrivateActivityController {
  constructor(private readonly privateActivityService: PrivateActivityService) { }

  @Get('user/:userId')
  async getByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const activities = await this.privateActivityService.getPrivateActivitiesByUserId(userId);
      return { success: true, data: activities };
    } catch (error) {
      console.error(`Error finding activities for user with id ${userId}:`, error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  
}
