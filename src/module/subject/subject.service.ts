import { Injectable, NotFoundException } from '@nestjs/common';
import { SubjectRepository } from './subject.repository';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  create(dto: CreateSubjectDto) {
    return this.subjectRepository.create(dto);
  }

  findAll() {
    return this.subjectRepository.findAll();
  }

  async findById(id: string) {
    const subject = await this.subjectRepository.findById(id);
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async update(id: string, dto: UpdateSubjectDto) {
    const subject = await this.subjectRepository.update(id, dto);
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async remove(id: string) {
    const subject = await this.subjectRepository.remove(id);
    if (!subject) throw new NotFoundException('Subject not found');
    return { message: 'Subject deleted successfully' };
  }
}
