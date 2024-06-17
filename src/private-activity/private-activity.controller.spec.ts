import { Test, TestingModule } from '@nestjs/testing';
import { PrivateActivityController } from './private-activity.controller';
import { PrivateActivityService } from './private-activity.service';

describe('PrivateActivityController', () => {
  let controller: PrivateActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateActivityController],
      providers: [PrivateActivityService],
    }).compile();

    controller = module.get<PrivateActivityController>(PrivateActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
