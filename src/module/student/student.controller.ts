import { Controller, Post, Get, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE } from 'src/common/constants/role.enum';
import { Roles } from '../auth/roles.decorator';
import { ROUTES } from 'src/common/constants/routes.constants';

@Controller(ROUTES.ADMIN.STUDENT)
@UseGuards(AuthGuard, RolesGuard)
@Roles(ROLE.ADMIN)
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post()
  create(@Body() dto: any, @Param('userModel') userModel: any) {
    return this.studentService.create(dto, userModel);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.studentService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.studentService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.studentService.delete(id);
  }
}