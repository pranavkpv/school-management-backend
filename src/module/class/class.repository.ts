import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchoolClass, SchoolClassDocument } from './class.schema';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassRepository {
  constructor(
    @InjectModel(SchoolClass.name)
    private readonly classModel: Model<SchoolClassDocument>,
  ) {}

  create(dto: CreateClassDto) {
    return this.classModel.create(dto);
  }

  findAll() {
    return this.classModel.find().sort({ createdAt: -1 });
  }

  findById(id: string) {
    return this.classModel.findById(id);
  }

  update(id: string, dto: UpdateClassDto) {
    return this.classModel.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: string) {
    return this.classModel.findByIdAndDelete(id);
  }
}
