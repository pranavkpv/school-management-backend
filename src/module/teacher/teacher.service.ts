import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherRepository } from './teacher.repository';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AssignTeacherSubjectsDto } from './dto/assign-teacher-subjects.dto';
import { MESSAGES } from 'src/common/constants/messages.constants';
import { generatePassword } from 'src/common/utils/password.util';
import { HashService } from 'src/common/services/hash.service';
import { AuthRepository } from '../auth/auth.repository';
import { ROLE } from 'src/common/constants/role.enum';
import { MailService } from 'src/config/mail.service';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly hashService: HashService,
    private readonly authRepo: AuthRepository,
    private readonly mailService:MailService
  ) { }

  async create(dto: CreateTeacherDto) {
    const password = generatePassword();
    const hashedPassword = await this.hashService.hashValue(password);
    const user = await this.authRepo.create({ email: dto.email, password: hashedPassword, role: ROLE.TEACHER })
    await  this.teacherRepository.create({
      name: dto.name,
      contactInfo: dto.contactInfo,
      experience: dto.experience,
      subjectId: dto.subjectId,
      userId: String(user._id)
    });
    await this.mailService.sendStudentCredentials(dto.email, password);
  }

  findAll() {
    return this.teacherRepository.findAll();
  }

  async findById(id: string) {
    const teacher = await this.teacherRepository.findById(id);
    if (!teacher) throw new NotFoundException(MESSAGES.TEACHER.NOT_FOUND);
    return teacher;
  }

  async update(id: string, dto: UpdateTeacherDto) {
    const teacher = await this.teacherRepository.update(id, dto);
    if (!teacher) throw new NotFoundException(MESSAGES.TEACHER.NOT_FOUND);
    return teacher;
  }

  // async assignSubjects(id: string, dto: AssignTeacherSubjectsDto) {
  //   const teacher = await this.teacherRepository.update(id, { subjectIds: dto.subjectIds });
  //   if (!teacher) throw new NotFoundException(MESSAGES.TEACHER.NOT_FOUND);
  //   return teacher;
  // }

  async remove(id: string) {
    const teacher = await this.teacherRepository.remove(id);
    if (!teacher) throw new NotFoundException(MESSAGES.TEACHER.NOT_FOUND);
    return { message: MESSAGES.TEACHER.DELETE };
  }
}
