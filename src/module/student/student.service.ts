import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import { MailService } from 'src/config/mail.service';
import { generatePassword } from 'src/common/utils/password.util';
import { ROLE } from 'src/common/constants/role.enum';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../auth/user.schema';
import { Model } from 'mongoose';
import { HashService } from 'src/common/services/hash.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentQueryDto } from './dto/student-query.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthRepository } from '../auth/auth.repository';


@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly authRepo: AuthRepository,
    private readonly mailService: MailService,
    private readonly hashService: HashService,
  ) { }

  async create(dto: CreateStudentDto) {
    const password = generatePassword();
    const hashedPassword = await this.hashService.hashValue(password);

    const user = await this.authRepo.create({ email: dto.email, password: hashedPassword, role: ROLE.STUDENT })

    const student = await this.studentRepo.create({
      name: dto.name,
      classId: dto.classId,
      rollNumber: dto.rollNumber,
      age: dto.age,
      contactInfo: dto.contactInfo,
      userId: String(user._id),
    });

    await this.mailService.sendStudentCredentials(dto.email, password);

    return student;
  }

  async findAll(query: StudentQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.studentRepo.findAll(query, skip, limit),
      this.studentRepo.count(query),
    ]);

    return {
      data,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async update(id: string, dto: UpdateStudentDto) {
    const student = await this.studentRepo.update(id, dto);
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async delete(id: string) {
    const student = await this.studentRepo.delete(id);
    if (!student) throw new NotFoundException('Student not found');
    return { message: 'Deleted successfully' };
  }
}