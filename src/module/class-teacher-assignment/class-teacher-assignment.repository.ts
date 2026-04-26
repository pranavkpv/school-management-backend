import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { ClassTeacherAssignment, ClassTeacherAssignmentDocument } from './class-teacher-assignment.schema';

@Injectable()
export class ClassTeacherAssignmentRepository {
  constructor(
    @InjectModel(ClassTeacherAssignment.name)
    private readonly model: Model<ClassTeacherAssignmentDocument>,
  ) { }

  async create(dto: CreateAssignmentDto) {
    return this.model.create(dto);
  }

  async findAll() {
    return this.model
      .find()
      .populate('classId')
      .populate('teacherId')
      .populate('subjectId');
  }

  async findByClass(classId: string) {
    return this.model
      .find({ classId })
      .populate('teacherId')
      .populate('subjectId');
  }

  async update(
    id: string,
    dto: CreateAssignmentDto
  ) {

    return this.model
      .findByIdAndUpdate(
        id,
        {
          classId: dto.classId,
          teacherId: dto.teacherId,
          subjectId: dto.subjectId
        },
        {
          new: true,
          runValidators: true
        }
      )
      .populate('classId')
      .populate('teacherId')
      .populate('subjectId');

  }

  async findByTeacher(teacherId: string) {
    return this.model
      .find({ teacherId })
      .populate('classId')
      .populate('subjectId');
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}