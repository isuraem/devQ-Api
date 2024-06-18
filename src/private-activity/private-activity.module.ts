import { Module } from '@nestjs/common';
import { PrivateActivityService } from './private-activity.service';
import { PrivateActivityController } from './private-activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateActivity } from './entities/private-activity.entity';
import { User } from 'src/users/entities/user.entity';
import { Question } from 'src/question/entities/question.entity';
import { Answer } from 'src/answer/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateActivity, User, Question, Answer])],
  controllers: [PrivateActivityController],
  providers: [PrivateActivityService],
})
export class PrivateActivityModule {}
