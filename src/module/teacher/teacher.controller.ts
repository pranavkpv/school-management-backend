import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ROUTES } from 'src/common/constants/routes.constants';
import { ROLE } from 'src/common/constants/role.enum';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AssignTeacherSubjectsDto } from './dto/assign-teacher-subjects.dto';
import { MESSAGES } from 'src/common/constants/messages.constants';

@Controller(ROUTES.ADMIN.TEACHER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE.ADMIN)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @Post()
  create(@Body() dto: CreateTeacherDto) {
    this.teacherService.create(dto);
    return {
      succe: true,
      message: MESSAGES.TEACHER.ADD
    }
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.teacherService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTeacherDto) {
    return this.teacherService.update(id, dto);
  }

  // @Patch(':id/subjects')
  // assignSubjects(@Param('id') id: string, @Body() dto: AssignTeacherSubjectsDto) {
  //   return this.teacherService.assignSubjects(id, dto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }
}
