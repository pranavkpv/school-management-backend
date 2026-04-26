import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassRepository } from './class.repository';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { AssignClassTeacherDto } from './dto/assign-class-teacher.dto';
import { AssignClassStudentsDto } from './dto/assign-class-students.dto';
import { MESSAGES } from 'src/common/constants/messages.constants';

@Injectable()
export class ClassService {
  constructor(private readonly classRepository: ClassRepository) { }

  create(dto: CreateClassDto) {
    return this.classRepository.create(dto);
  }

  findAll() {
    return this.classRepository.findAll();
  }

  async findById(id: string) {
    const classItem = await this.classRepository.findById(id);
    if (!classItem) throw new NotFoundException(MESSAGES.CLASS.NOT_FOUND);
    return classItem;
  }

  async update(id: string, dto: UpdateClassDto) {
    const classItem = await this.classRepository.update(id, dto);
    if (!classItem) throw new NotFoundException(MESSAGES.CLASS.NOT_FOUND);
    return classItem;
  }

  // async assignTeacher(id: string, dto: AssignClassTeacherDto) {
  //   const classItem = await this.classRepository.update(id, { teacherId: dto.teacherId });
  //   if (!classItem) throw new NotFoundException('Class not found');
  //   return classItem;
  // }

  // async assignStudents(id: string, dto: AssignClassStudentsDto) {
  //   const classItem = await this.classRepository.update(id, { studentIds: dto.studentIds });
  //   if (!classItem) throw new NotFoundException('Class not found');
  //   return classItem;
  // }

  async remove(id: string) {
    const classItem = await this.classRepository.remove(id);
    if (!classItem) throw new NotFoundException(MESSAGES.CLASS.NOT_FOUND);
    return { message: MESSAGES.CLASS.DELETE };
  }
}
