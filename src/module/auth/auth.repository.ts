import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class AuthRepository {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) { }

  async findByEmail(
    email: string
  ) {
    return this.userModel.findOne({ email });
  }
  async create(
    dto: CreateDto
  ) {
    const user = await this.userModel.create({
      email: dto.email,
      password: dto.password,
      role: dto.role,
    });
    return user
  }
}