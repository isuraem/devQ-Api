import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { QuestionModule } from './question/question.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    DatabaseModule, 
    UsersModule,
    CompanyModule,
    QuestionModule,
    AuthorizationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
