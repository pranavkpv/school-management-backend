import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from './teacher.schema';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CreateTeacherRepoDto } from './dto/create-teacher-repo-dto';

@Injectable()
export class TeacherRepository {
  constructor(
    @InjectModel(Teacher.name)
    private readonly teacherModel: Model<TeacherDocument>,
  ) { }

  create(dto: CreateTeacherRepoDto) {
    return this.teacherModel.create(dto);
  }

  findAll() {
    return this.teacherModel
      .find()

      .populate({
        path: "subjectId",
        select: "name"
      })

      .populate({
        path: "userId",
        select: "email"
      })

      .sort({
        createdAt: -1
      });
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
