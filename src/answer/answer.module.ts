import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Question } from 'src/question/entities/question.entity';
import { PrivateActivity } from 'src/private-activity/entities/private-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, User, Answer, PrivateActivity])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
