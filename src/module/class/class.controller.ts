import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ROUTES } from 'src/common/constants/routes.constants';
import { ROLE } from 'src/common/constants/role.enum';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { AssignClassTeacherDto } from './dto/assign-class-teacher.dto';
import { AssignClassStudentsDto } from './dto/assign-class-students.dto';

@Controller(ROUTES.ADMIN.CLASS)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE.ADMIN)
export class ClassController {
  constructor(private readonly classService: ClassService) { }

  @Post()
  create(@Body() dto: CreateClassDto) {
    return this.classService.create(dto);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.classService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClassDto) {
    return this.classService.update(id, dto);
  }

  // @Patch(':id/teacher')
  // assignTeacher(@Param('id') id: string, @Body() dto: AssignClassTeacherDto) {
  //   return this.classService.assignTeacher(id, dto);
  // }

  // @Patch(':id/students')
  // assignStudents(@Param('id') id: string, @Body() dto: AssignClassStudentsDto) {
  //   return this.classService.assignStudents(id, dto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(id);
  }
}
