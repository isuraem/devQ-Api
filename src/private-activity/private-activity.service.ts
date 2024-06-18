import { Injectable } from '@nestjs/common';
import { CreatePrivateActivityDto } from './dto/create-private-activity.dto';
import { UpdatePrivateActivityDto } from './dto/update-private-activity.dto';
import { PrivateActivity } from './entities/private-activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PrivateActivityService {
 
  constructor(
    @InjectRepository(PrivateActivity)
    private readonly privateActivityRepository: Repository<PrivateActivity>
  ) {}

  async getPrivateActivitiesByUserId(userId: number): Promise<PrivateActivity[]> {
    return this.privateActivityRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'question', 'answer', 'performedBy'],
    });
  }
}
