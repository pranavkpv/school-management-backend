import {
 Controller,
 Post,
 Body,
 Get
} from '@nestjs/common';

import { StudentService } from './student.service';

@Controller('students')
export class StudentController{

constructor(
 private studentService:StudentService
){}

@Post('register')
register(
 @Body() body:any
){
 return this.studentService.createStudent(body);
}

@Get()
findAll(){
 return this.studentService.getStudents();
}

}