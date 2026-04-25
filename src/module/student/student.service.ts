import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './student.schema';

@Injectable()
export class StudentService{

constructor(
 @InjectModel(Student.name)
 private studentModel:Model<Student>
){}

async createStudent(data:any){
 return this.studentModel.create(data);
}

async getStudents(){
 return this.studentModel.find();
}

}