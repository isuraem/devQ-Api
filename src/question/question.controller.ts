// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { QuestionService } from './question.service';
// import { CreateQuestionDto } from './dto/create-question.dto';
// import { UpdateQuestionDto } from './dto/update-question.dto';

// @Controller('question')
// export class QuestionController {
//   constructor(private readonly questionService: QuestionService) {}

//   @Post()
//   create(@Body() createQuestionDto: CreateQuestionDto) {
//     return this.questionService.create(createQuestionDto);
//   }

//   @Get()
//   findAll() {
//     return this.questionService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.questionService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
//     return this.questionService.update(+id, updateQuestionDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.questionService.remove(+id);
//   }
// }

import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createQuestionDto: CreateQuestionDto): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const question = await this.questionService.create(createQuestionDto);
      return { success: true, data: question };
    } catch (error) {
      console.error('Error creating question:', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<{ success: boolean, data?: any[], error?: string }> {
    try {
      const questions = await this.questionService.findAll();
      return { success: true, data: questions };
    } catch (error) {
      console.error('Error finding questions:', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const question = await this.questionService.findOne(+id);
      if (!question) {
        throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, data: question };
    } catch (error) {
      console.error(`Error finding question with id ${id}:`, error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const updatedQuestion = await this.questionService.update(+id, updateQuestionDto);
      return { success: true, data: updatedQuestion };
    } catch (error) {
      console.error(`Error updating question with id ${id}:`, error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean, error?: string }> {
    try {
      await this.questionService.remove(+id);
      return { success: true };
    } catch (error) {
      console.error(`Error removing question with id ${id}:`, error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user/:userId')
  async findAllByUserId(@Param('userId') userId: string): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const questions = await this.questionService.findAllByUserId(+userId);
      return { success: true, data: questions };
    } catch (error) {
      console.error(`Error finding questions for user with id ${userId}:`, error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}

