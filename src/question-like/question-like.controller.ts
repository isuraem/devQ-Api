import { Controller, Get, Post, Param, Delete, Body, UsePipes, ValidationPipe, HttpStatus, HttpException } from '@nestjs/common';
import { QuestionLikeService } from './question-like.service';

@Controller('question-like')
export class QuestionLikeController {
  constructor(private readonly questionLikeService: QuestionLikeService) {}

  @Post(':userId/:questionId')
  async create(
    @Param('userId') userId: number,
    @Param('questionId') questionId: number
  ): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const like = await this.questionLikeService.create(userId, questionId);
      return { success: true, data: like };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':userId/:questionId')
  async remove(
    @Param('userId') userId: number,
    @Param('questionId') questionId: number
  ): Promise<{ success: boolean, error?: string }> {
    try {
      await this.questionLikeService.unlikeQuestion(userId, questionId);
      return { success: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':questionId')
  async getLikesForQuestion(
    @Param('questionId') questionId: number
  ): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const likes = await this.questionLikeService.getLikesForQuestion(questionId);
      return { success: true, data: likes };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
