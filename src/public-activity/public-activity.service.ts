import { Injectable } from '@nestjs/common';
import { CreatePublicActivityDto } from './dto/create-public-activity.dto';
import { UpdatePublicActivityDto } from './dto/update-public-activity.dto';

@Injectable()
export class PublicActivityService {
  create(createPublicActivityDto: CreatePublicActivityDto) {
    return 'This action adds a new publicActivity';
  }

  findAll() {
    return `This action returns all publicActivity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicActivity`;
  }

  update(id: number, updatePublicActivityDto: UpdatePublicActivityDto) {
    return `This action updates a #${id} publicActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicActivity`;
  }
}
