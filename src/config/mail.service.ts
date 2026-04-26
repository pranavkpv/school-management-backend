import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendStudentCredentials(email: string, password: string) {
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Your School Account Credentials',
      html: this.getStudentEmailTemplate(email, password),
    };

    await this.transporter.sendMail(mailOptions);
  }

  private getStudentEmailTemplate(email: string, password: string) {
    return `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
        <div style="max-width:600px;margin:auto;background:#ffffff;padding:30px;border-radius:10px;">
          
          <h2 style="color:#2b6cb0;">🎓 Welcome to School Management System</h2>

          <p>Hello,</p>

          <p>Your account has been successfully created. Below are your login credentials:</p>

          <div style="background:#f1f1f1;padding:15px;border-radius:8px;margin:20px 0;">
            <p><b>Email:</b> ${ email }</p>
            <p><b>Password:</b> ${ password }</p>
          </div>

          <p style="color:red;">
            ⚠️ Please change your password after first login.
          </p>

          <a href="http://localhost:3000/login"
             style="display:inline-block;padding:10px 20px;background:#2b6cb0;color:white;text-decoration:none;border-radius:5px;">
             Login Now
          </a>

          <hr style="margin:30px 0;" />

          <p style="font-size:12px;color:gray;">
            © ${ new Date().getFullYear() } School Management System
          </p>
        </div>
      </div>
    `;
  }
}