import { Module } from '@nestjs/common';
import { PublicActivityService } from './public-activity.service';
import { PublicActivityController } from './public-activity.controller';
import { PublicActivity } from './entities/public-activity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicActivity, User])],
  controllers: [PublicActivityController],
  providers: [PublicActivityService],
})
export class PublicActivityModule {}
