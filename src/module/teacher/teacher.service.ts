import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherRepository } from './teacher.repository';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AssignTeacherSubjectsDto } from './dto/assign-teacher-subjects.dto';

@Injectable()
export class TeacherService {
  constructor(private readonly teacherRepository: TeacherRepository) {}

  create(dto: CreateTeacherDto) {
    return this.teacherRepository.create(dto);
  }

  findAll() {
    return this.teacherRepository.findAll();
  }

  async findById(id: string) {
    const teacher = await this.teacherRepository.findById(id);
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async update(id: string, dto: UpdateTeacherDto) {
    const teacher = await this.teacherRepository.update(id, dto);
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async assignSubjects(id: string, dto: AssignTeacherSubjectsDto) {
    const teacher = await this.teacherRepository.update(id, { subjectIds: dto.subjectIds });
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async remove(id: string) {
    const teacher = await this.teacherRepository.remove(id);
    if (!teacher) throw new NotFoundException('Teacher not found');
    return { message: 'Teacher deleted successfully' };
  }
}
