import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { Question } from 'src/question/entities/question.entity';
import { Company } from 'src/company/entities/company.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly entityManager: EntityManager,

  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const { name } = createTagDto;

    // Check if the tag with the provided name already exists
    const existingTag = await this.tagRepository.findOne({ where: { name } });
    if (existingTag) {
      throw new ConflictException(`Tag with name '${name}' already exists`);
    }

    // Create a new tag
    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    const { name } = updateTagDto;

    // Check if the tag with the provided ID exists
    const tag = await this.findOne(id);

    // Check if the updated name already exists for another tag
    if (name && name !== tag.name) {
      const existingTag = await this.tagRepository.findOne({ where: { name } });
      if (existingTag) {
        throw new ConflictException(`Tag with name '${name}' already exists`);
      }
    }

    // Update the tag
    Object.assign(tag, updateTagDto);
    return this.tagRepository.save(tag);
  }

  async remove(id: number): Promise<void> {
    // Check if the tag with the provided ID exists
    const tag = await this.findOne(id);

    // Remove the tag
    await this.tagRepository.remove(tag);
  }

  async findQuestionsByTagAndCompany(tagId: number, companyId: number): Promise<Question[]> {
    const tag = await this.tagRepository.findOne({
      where: { id: tagId },
      relations: ['questions', 'questions.user', 'questions.user.company'],
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${tagId} not found`);
    }

    const questions = tag.questions.filter(question => question.user.company.id === companyId);

    return questions;
  }

  async findAllQuestionsByTagsInCompany(companyId: number): Promise<{ [tag: string]: Question[] }> {
    const company = await this.entityManager.findOne(Company, {
      where: { id: companyId },
      relations: ['users'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const userIds = company.users.map(user => user.id);

    const tags = await this.tagRepository.find({ relations: ['questions', 'questions.user'] });

    const result = {};
    for (const tag of tags) {
      result[tag.name] = tag.questions.filter(question => userIds.includes(question.user.id));
    }

    return result;
  }
}
