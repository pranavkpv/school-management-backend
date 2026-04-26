import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import { MailService } from 'src/config/mail.service';
import { generatePassword } from 'src/common/utils/password.util';
import { ROLE } from 'src/common/constants/role.enum';


@Injectable()
export class StudentService {
   constructor(
      private studentRepo: StudentRepository,
      private mailService: MailService,
   ) { }

   async create(dto: any, userModel: any) {
      const password = generatePassword();

      const user = await userModel.create({
         email: dto.email,
         password,
         role: ROLE.STUDENT,
      });

      const student = await this.studentRepo.create({
         name: dto.name,
         class: dto.class,
         rollNumber: dto.rollNumber,
         age: dto.age,
         contactInfo: dto.contactInfo,
         userId: user._id,
      });

      await this.mailService.sendStudentCredentials(dto.email, password);

      return student;
   }

   async findAll(query: any) {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
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

   async update(userId: string, dto: any) {
      const student = await this.studentRepo.update(userId, dto);
      if (!student) throw new NotFoundException('Student not found');
      return student;
   }

   async delete(userId: string) {
      const student = await this.studentRepo.delete(userId);
      if (!student) throw new NotFoundException('Student not found');
      return { message: 'Deleted successfully' };
   }
}