import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject, SubjectDocument } from './subject.schema';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectRepository {
  constructor(
    @InjectModel(Subject.name)
    private readonly subjectModel: Model<SubjectDocument>,
  ) {}

  create(dto: CreateSubjectDto) {
    return this.subjectModel.create(dto);
  }

  findAll() {
    return this.subjectModel.find().sort({ createdAt: -1 });
  }

  findById(id: string) {
    return this.subjectModel.findById(id);
  }

  update(id: string, dto: UpdateSubjectDto) {
    return this.subjectModel.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: string) {
    return this.subjectModel.findByIdAndDelete(id);
  }
}
