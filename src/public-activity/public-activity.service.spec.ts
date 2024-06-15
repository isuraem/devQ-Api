import { Test, TestingModule } from '@nestjs/testing';
import { PublicActivityService } from './public-activity.service';

describe('PublicActivityService', () => {
  let service: PublicActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicActivityService],
    }).compile();

    service = module.get<PublicActivityService>(PublicActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
