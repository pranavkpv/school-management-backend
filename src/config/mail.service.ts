import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendStudentCredentials(email: string, password: string) {
    console.log(`Email sent to ${email}`);
    console.log(`Password: ${password}`);
  }
}