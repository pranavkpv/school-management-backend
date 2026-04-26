import { Body, Controller, Get, Param, Post, Delete, UseGuards } from '@nestjs/common';
import { ClassTeacherAssignmentService } from './class-teacher-assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLE } from 'src/common/constants/role.enum';
import { Roles } from '../auth/roles.decorator';
import { ROUTES } from 'src/common/constants/routes.constants';

@Controller(ROUTES.ADMIN.ASSIGN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE.ADMIN)
export class ClassTeacherAssignmentController {
   constructor(private readonly service: ClassTeacherAssignmentService) { }

   @Post()
   assignTeacher(@Body() dto: CreateAssignmentDto) {
      return this.service.assignTeacher(dto);
   }

   @Get()
   getAll() {
      return this.service.getAllAssignments();
   }

   @Get('class/:classId')
   getByClass(@Param('classId') classId: string) {
      return this.service.getTeachersByClass(classId);
   }

   @Get('teacher/:teacherId')
   getByTeacher(@Param('teacherId') teacherId: string) {
      return this.service.getClassesByTeacher(teacherId);
   }

   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.service.removeAssignment(id);
   }
}