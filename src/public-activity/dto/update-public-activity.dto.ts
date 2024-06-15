import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicActivityDto } from './create-public-activity.dto';

export class UpdatePublicActivityDto extends PartialType(CreatePublicActivityDto) {}
