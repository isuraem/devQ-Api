import { Module } from '@nestjs/common';
import { QuestionLikeService } from './question-like.service';
import { QuestionLikeController } from './question-like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionLike } from './entities/question-like.entity';
import { User } from 'src/users/entities/user.entity';
import { Question } from 'src/question/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionLike, User, Question])],
  controllers: [QuestionLikeController],
  providers: [QuestionLikeService],
})
export class QuestionLikeModule {}
