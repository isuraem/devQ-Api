import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { PublicActivityService } from './public-activity.service';
import { CreatePublicActivityDto } from './dto/create-public-activity.dto';
import { UpdatePublicActivityDto } from './dto/update-public-activity.dto';

@Controller('public-activity')
export class PublicActivityController {
  constructor(private readonly publicActivityService: PublicActivityService) {}

  @Get('company/:companyId')
  async getByCompanyId(@Param('companyId', ParseIntPipe) companyId: number): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const activities = await this.publicActivityService.findByCompanyId(companyId);
      return { success: true, data: activities };
    } catch (error) {
      console.error(`Error finding activities for company with id ${companyId}:`, error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
