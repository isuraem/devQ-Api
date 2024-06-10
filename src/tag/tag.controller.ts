import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createTagDto: CreateTagDto): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const tag = await this.tagService.create(createTagDto);
      return { success: true, data: tag };
    } catch (error) {
      console.error('Error creating tag:', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<{ success: boolean, data?: any[], error?: string }> {
    try {
      const tags = await this.tagService.findAll();
      return { success: true, data: tags };
    } catch (error) {
      console.error('Error finding tags:', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const tag = await this.tagService.findOne(+id);
      if (!tag) {
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, data: tag };
    } catch (error) {
      console.error(`Error finding tag with id ${id}:`, error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const updatedTag = await this.tagService.update(+id, updateTagDto);
      return { success: true, data: updatedTag };
    } catch (error) {
      console.error(`Error updating tag with id ${id}:`, error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean, error?: string }> {
    try {
      await this.tagService.remove(+id);
      return { success: true };
    } catch (error) {
      console.error(`Error removing tag with id ${id}:`, error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':tagId/company/:companyId')
  async findQuestionsByTagAndCompany(@Param('tagId') tagId: string, @Param('companyId') companyId: string): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const questions = await this.tagService.findQuestionsByTagAndCompany(+tagId, +companyId);
      return { success: true, data: questions };
    } catch (error) {
      console.error(`Error finding questions for tag with id ${tagId} and company with id ${companyId}:`, error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('company/:companyId')
  async findAllQuestionsByTagsInCompany(@Param('companyId') companyId: string): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const questions = await this.tagService.findAllQuestionsByTagsInCompany(+companyId);
      return { success: true, data: questions };
    } catch (error) {
      console.error(`Error finding questions for company with id ${companyId}:`, error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
