import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionLikeDto } from './dto/create-question-like.dto';
import { UpdateQuestionLikeDto } from './dto/update-question-like.dto';
import { Question } from 'src/question/entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { QuestionLike } from './entities/question-like.entity';
import { User } from 'src/users/entities/user.entity';
import { PrivateActivity } from 'src/private-activity/entities/private-activity.entity';

@Injectable()
export class QuestionLikeService {
  constructor(
    @InjectRepository(QuestionLike)
    private questionLikeRepository: Repository<QuestionLike>,
    private entityManager: EntityManager,
  ) { }

  async create(userId: number, questionId: number): Promise<any> {
    const user = await this.entityManager.findOne(User, { where: { id: userId } });
    const question = await this.entityManager.findOne(Question, { where: { id: questionId }, relations: ['user'] });

    if (!user || !question) {
      throw new NotFoundException('User or Question not found');
    }
    const like = new QuestionLike({
      user: user,
      question: question
    });

    const savedLike = await this.entityManager.save(like);

    const privateActivity = this.entityManager.create(PrivateActivity, {
      user: question.user,
      activityType: '1',
      performedBy: user,
      question,
    });

    await this.entityManager.save(PrivateActivity, privateActivity);

    return savedLike;
  }

  async unlikeQuestion(userId: number, questionId: number): Promise<void> {
    const like = await this.questionLikeRepository.findOne({
      where: {
        user: { id: userId },
        question: { id: questionId },
      },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.questionLikeRepository.delete(like.id);
  }

  async getLikesForQuestion(questionId: number): Promise<any[]> {
    return this.questionLikeRepository.find({
      where: { question: { id: questionId } },
      relations: ['user'],
    });
  }
}
