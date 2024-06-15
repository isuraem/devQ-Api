import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PublicActivityService } from './public-activity.service';
import { CreatePublicActivityDto } from './dto/create-public-activity.dto';
import { UpdatePublicActivityDto } from './dto/update-public-activity.dto';
import { PublicActivity } from './entities/public-activity.entity';

@Controller('public-activity')
export class PublicActivityController {
  constructor(private readonly publicActivityService: PublicActivityService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createPublicActivityDto: CreatePublicActivityDto,
  ): Promise<{ success: boolean; data?: PublicActivity; error?: string }> {
    try {
      const publicActivity = await this.publicActivityService.create(createPublicActivityDto);
      return { success: true, data: publicActivity };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<{ success: boolean; data?: PublicActivity[]; error?: string }> {
    try {
      const publicActivities = await this.publicActivityService.findAll();
      return { success: true, data: publicActivities };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<{ success: boolean; data?: PublicActivity; error?: string }> {
    try {
      const publicActivity = await this.publicActivityService.findOne(id);
      if (!publicActivity) {
        throw new HttpException('Public Activity not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, data: publicActivity };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: number,
    @Body() updatePublicActivityDto: UpdatePublicActivityDto,
  ): Promise<{ success: boolean; data?: PublicActivity; error?: string }> {
    try {
      const updatedPublicActivity = await this.publicActivityService.update(id, updatePublicActivityDto);
      return { success: true, data: updatedPublicActivity };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ success: boolean; error?: string }> {
    try {
      await this.publicActivityService.remove(id);
      return { success: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
