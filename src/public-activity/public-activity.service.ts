import { Injectable } from '@nestjs/common';
import { CreatePublicActivityDto } from './dto/create-public-activity.dto';
import { UpdatePublicActivityDto } from './dto/update-public-activity.dto';
import { PublicActivity } from './entities/public-activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PublicActivityService {
  constructor(
    @InjectRepository(PublicActivity)
    private readonly publicActivityRepository: Repository<PublicActivity>
  ) {}

  async findByCompanyId(companyId: number): Promise<PublicActivity[]> {
    return this.publicActivityRepository.find({
      where: { company: { id: companyId } },
      relations: ['user', 'question', 'company'],
    });
  }
}
