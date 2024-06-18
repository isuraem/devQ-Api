import { Module, ValidationPipe  } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Company } from 'src/company/entities/company.entity';
import { Question } from 'src/question/entities/question.entity';
import { APP_PIPE } from '@nestjs/core';
import { Answer } from 'src/answer/entities/answer.entity';
import { PrivateActivity } from 'src/private-activity/entities/private-activity.entity';
import { PublicActivity } from 'src/public-activity/entities/public-activity.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Question, Answer, PrivateActivity, PublicActivity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
