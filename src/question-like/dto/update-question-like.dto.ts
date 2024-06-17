import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionLikeDto } from './create-question-like.dto';

export class UpdateQuestionLikeDto extends PartialType(CreateQuestionLikeDto) {}
