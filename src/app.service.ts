import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Register } from './app.entity';
import { RegisterUserDto } from './app.register.user.dto';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
  ) {}

  getSkate(): string {
    return 'PTLMD';
  }

  async create(registerUserDto: RegisterUserDto): Promise<Register> {
    const { email, password } = registerUserDto;

    const existingUser = await this.registerRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('email already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = this.registerRepository.create({
      email,
      password: hashPassword,
    });

    try {
      const savedUser = await this.registerRepository.save(user);
      return savedUser;
    } catch (error) {
      throw error;
    }
  }
}
