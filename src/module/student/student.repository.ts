import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  create(data: any) {
    return this.studentModel.create(data);
  }

  findById(id: string) {
    return this.studentModel.findById(id);
  }

  update(userId: string, data: any) {
    return this.studentModel.findOneAndUpdate({ userId }, data, { new: true });
  }

  delete(userId: string) {
    return this.studentModel.findOneAndDelete({ userId });
  }

  async findAll(query: any, skip: number, limit: number) {
    const filter: any = {};

    if (query.search) {
      filter.name = { $regex: query.search, $options: 'i' };
    }

    return this.studentModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  count(query: any) {
    const filter: any = {};
    if (query.search) {
      filter.name = { $regex: query.search, $options: 'i' };
    }
    return this.studentModel.countDocuments(filter);
  }
}