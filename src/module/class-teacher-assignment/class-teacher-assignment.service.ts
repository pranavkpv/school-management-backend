import { Injectable } from '@nestjs/common';
import { ClassTeacherAssignmentRepository } from './class-teacher-assignment.repository';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class ClassTeacherAssignmentService {
  constructor(
    private readonly repo: ClassTeacherAssignmentRepository,
  ) {}

  async assignTeacher(dto: CreateAssignmentDto) {
    return this.repo.create(dto);
  }

  async getAllAssignments() {
    return this.repo.findAll();
  }

  async getTeachersByClass(classId: string) {
    return this.repo.findByClass(classId);
  }

  async getClassesByTeacher(teacherId: string) {
    return this.repo.findByTeacher(teacherId);
  }

  async removeAssignment(id: string) {
    return this.repo.delete(id);
  }
}