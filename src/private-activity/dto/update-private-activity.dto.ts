import { PartialType } from '@nestjs/mapped-types';
import { CreatePrivateActivityDto } from './create-private-activity.dto';

export class UpdatePrivateActivityDto extends PartialType(CreatePrivateActivityDto) {}
