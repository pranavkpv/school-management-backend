import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from './teacher.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherRepository {
  constructor(
    @InjectModel(Teacher.name)
    private readonly teacherModel: Model<TeacherDocument>,
  ) {}

  create(dto: CreateTeacherDto) {
    return this.teacherModel.create(dto);
  }

  findAll() {
    return this.teacherModel.find().sort({ createdAt: -1 });
  }

  findById(id: string) {
    return this.teacherModel.findById(id);
  }

  update(id: string, dto: UpdateTeacherDto) {
    return this.teacherModel.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: string) {
    return this.teacherModel.findByIdAndDelete(id);
  }
}
