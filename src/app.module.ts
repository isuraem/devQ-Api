import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { QuestionModule } from './question/question.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { AnswerModule } from './answer/answer.module';
import { TagModule } from './tag/tag.module';
import { PublicActivityModule } from './public-activity/public-activity.module';
import { PrivateActivityModule } from './private-activity/private-activity.module';
import { QuestionLikeModule } from './question-like/question-like.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    DatabaseModule, 
    UsersModule,
    CompanyModule,
    QuestionModule,
    AuthorizationModule,
    AnswerModule,
    TagModule,
    PublicActivityModule,
    PrivateActivityModule,
    QuestionLikeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
