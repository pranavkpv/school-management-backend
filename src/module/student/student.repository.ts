import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.schema';
import { StudentQueryDto } from './dto/student-query.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentRepoDto } from './dto/create-student-repo';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) { }

  create(data: CreateStudentRepoDto) {
    return this.studentModel.create(data);
  }

  findById(id: string) {
    return this.studentModel.findById(id);
  }

  update(id: string, data: UpdateStudentDto) {
    return this.studentModel.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return this.studentModel.findByIdAndDelete(id);
  }

  async findAll(
    query: StudentQueryDto,
    skip: number,
    limit: number
  ) {

    const filter: any = {};

    if (query.search) {
      filter.name = {
        $regex: query.search,
        $options: 'i'
      };
    }

    return this.studentModel
      .find(filter)

      .populate({
        path: "classId",
        select: "className"
      })

      .populate({
        path: "userId",
        select: "email"
      })

      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1
      });
  }

  count(query: StudentQueryDto) {
    const filter: any = {};
    if (query.search) {
      filter.name = { $regex: query.search, $options: 'i' };
    }
    return this.studentModel.countDocuments(filter);
  }
}