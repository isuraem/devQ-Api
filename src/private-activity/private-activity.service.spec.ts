import { Test, TestingModule } from '@nestjs/testing';
import { PrivateActivityService } from './private-activity.service';

describe('PrivateActivityService', () => {
  let service: PrivateActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivateActivityService],
    }).compile();

    service = module.get<PrivateActivityService>(PrivateActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
