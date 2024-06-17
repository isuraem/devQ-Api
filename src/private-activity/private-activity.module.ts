import { Module } from '@nestjs/common';
import { PrivateActivityService } from './private-activity.service';
import { PrivateActivityController } from './private-activity.controller';

@Module({
  controllers: [PrivateActivityController],
  providers: [PrivateActivityService],
})
export class PrivateActivityModule {}
