import { Injectable } from '@nestjs/common';
import { CreatePrivateActivityDto } from './dto/create-private-activity.dto';
import { UpdatePrivateActivityDto } from './dto/update-private-activity.dto';

@Injectable()
export class PrivateActivityService {
  create(createPrivateActivityDto: CreatePrivateActivityDto) {
    return 'This action adds a new privateActivity';
  }

  findAll() {
    return `This action returns all privateActivity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} privateActivity`;
  }

  update(id: number, updatePrivateActivityDto: UpdatePrivateActivityDto) {
    return `This action updates a #${id} privateActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} privateActivity`;
  }
}
