import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ROUTES } from 'src/common/constants/routes.constants';
import { ROLE } from 'src/common/constants/role.enum';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { MESSAGES } from 'src/common/constants/messages.constants';

@Controller(ROUTES.ADMIN.SUBJECT)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE.ADMIN)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) { }

  @Post()
  create(@Body() dto: CreateSubjectDto) {
    this.subjectService.create(dto);
    return {
      success: true,
      message: MESSAGES.SUBJECT.ADD
    }
  }

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.subjectService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubjectDto) {
    return this.subjectService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(id);
  }
}
