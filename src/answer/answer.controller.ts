import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createAnswerDto: CreateAnswerDto): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const answer = await this.answerService.create(createAnswerDto);
      return { success: true, data: answer };
    } catch (error) {
      console.error('Error creating answer:', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<{ success: boolean, data?: any[], error?: string }> {
    try {
      const answers = await this.answerService.findAll();
      return { success: true, data: answers };
    } catch (error) {
      console.error('Error finding answers:', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const answer = await this.answerService.findOne(+id);
      if (!answer) {
        throw new HttpException('Answer not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, data: answer };
    } catch (error) {
      console.error(`Error finding answer with id ${id}:`, error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const updatedAnswer = await this.answerService.update(+id, updateAnswerDto);
      return { success: true, data: updatedAnswer };
    } catch (error) {
      console.error(`Error updating answer with id ${id}:`, error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean, error?: string }> {
    try {
      await this.answerService.remove(+id);
      return { success: true };
    } catch (error) {
      console.error(`Error removing answer with id ${id}:`, error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
