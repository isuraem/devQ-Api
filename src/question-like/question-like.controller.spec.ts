import { Test, TestingModule } from '@nestjs/testing';
import { QuestionLikeController } from './question-like.controller';
import { QuestionLikeService } from './question-like.service';

describe('QuestionLikeController', () => {
  let controller: QuestionLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionLikeController],
      providers: [QuestionLikeService],
    }).compile();

    controller = module.get<QuestionLikeController>(QuestionLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
