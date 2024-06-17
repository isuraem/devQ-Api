import { Test, TestingModule } from '@nestjs/testing';
import { PublicActivityController } from './public-activity.controller';
import { PublicActivityService } from './public-activity.service';

describe('PublicActivityController', () => {
  let controller: PublicActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicActivityController],
      providers: [PublicActivityService],
    }).compile();

    controller = module.get<PublicActivityController>(PublicActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
