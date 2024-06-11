import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Company } from 'src/company/entities/company.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { Tag } from 'src/tag/entities/tag.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Question, User, Company, Answer, Tag])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
