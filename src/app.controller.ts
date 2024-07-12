import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

import { RegisterUserDto } from './app.register.user.dto';
import { Register } from './app.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getSkate(): string {
    return this.appService.getSkate();
  }

  @Post('register')
  async create(@Body() registerUserDto: RegisterUserDto): Promise<Register> {
    console.log('recibido');
    const result = await this.appService.create(registerUserDto);
    console.log('no recibido');
    return result;
  }

}
