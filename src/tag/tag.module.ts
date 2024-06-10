import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { Question } from 'src/question/entities/question.entity';
import { Tag } from './entities/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Tag])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
