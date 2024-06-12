import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { Question } from 'src/question/entities/question.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    private readonly entityManager: EntityManager,
  ) { }

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const question = await this.entityManager.findOne(Question, { where: { id: createAnswerDto.question_id } });
    if (!question) {
      throw new NotFoundException(`Question with ID ${createAnswerDto.question_id} not found`);
    }

    const user = await this.entityManager.findOne(User, { where: { id: createAnswerDto.user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${createAnswerDto.user_id} not found`);
    }

    const answer = this.answerRepository.create({
      ...createAnswerDto,
      question,
      user,
    });

    return this.answerRepository.save(answer);
  }

  async findAll(): Promise<Answer[]> {
    return this.answerRepository.find({ relations: ['question', 'user'] });
  }

  async findOne(id: number): Promise<Answer> {
    const answer = await this.answerRepository.findOne({
      where: { id },
      relations: ['question', 'user']
    });
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return answer;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    const answer = await this.findOne(id);
    answer.answer_text = updateAnswerDto.answer_text;
    return this.answerRepository.save(answer);
  }

  async remove(id: number): Promise<void> {
    const result = await this.answerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
  }
}
