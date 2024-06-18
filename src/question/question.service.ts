import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { EntityManager, In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/company/entities/company.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { PublicActivity } from 'src/public-activity/entities/public-activity.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly entityManager: EntityManager,
  ) { }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const user = await this.entityManager.findOne(User, { where: { id: createQuestionDto.user_id }, relations: ['company'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${createQuestionDto.user_id} not found`);
    }

    const tags = await Promise.all(
      createQuestionDto.tags.map(tagName => this.getOrCreateTag(tagName))
    );

    const question = this.questionRepository.create({
      ...createQuestionDto,
      user,
      tags,
    });

    const savedQuestion = await this.questionRepository.save(question);
    console.log("user data",user)
    const company = await this.entityManager.findOne(Company, { where: { id: user.company.id } }); // Adjust as needed
    if (!company) {
      throw new NotFoundException(`Company with ID ${user.company.id} not found`);
    }

    const publicActivity = this.entityManager.create(PublicActivity, {
      company,
      notificationText: `New question added: ${savedQuestion.title}`,
      user,
      question: savedQuestion,
      activityType: '0', // or whatever string represents type '0'
    });

    await this.entityManager.save(publicActivity);

    return savedQuestion;
  }

  private async getOrCreateTag(name: string): Promise<Tag> {
    let tag = await this.entityManager.findOne(Tag, { where: { name } });
    if (!tag) {
      tag = this.entityManager.create(Tag, { name });
      tag = await this.entityManager.save(Tag, tag);
    }
    return tag;
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find({
      relations: ['user']
    });
  }

  async findOne(id: number): Promise<Question> {

    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['user', 'answers','answers.user']
    });

    if (!question) {
      throw new NotFoundException('User not found');
    }

    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {

    const question = await this.findOne(id);
    question.title = updateQuestionDto.title;
    question.description = updateQuestionDto.description;
    return this.questionRepository.save(question);

  }

  async remove(id: number): Promise<void> {

    const result = await this.questionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Question not found');
    }

  }

  async findAllByCompanyId(companyId: number): Promise<Question[]> {
    const company = await this.entityManager.findOne(Company, { where: { id: companyId }, relations: ['users'] });
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const userIds = company.users.map(user => user.id);

    return this.questionRepository.find({
      where: {
        user: {
          id: In(userIds),
        },
      },
      relations: ['user', 'tags','answers','likes','likes.user'],
    });
  }

  async findAllByUserId(userId: number): Promise<Question[]> {
    const user = await this.entityManager.findOne(User, { where: { id: userId }, relations: ['company'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const companyId = user.company.id;

    return this.findAllByCompanyId(companyId);
  }


  async findOneByUserId(userId: number): Promise<Question[]> {
    const user = await this.entityManager.findOne(User, { where: { id: userId }, relations: ['company'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    const questions = await this.questionRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'tags', 'answers', 'likes', 'likes.user'],
    });
  
    return questions;
  }


}
