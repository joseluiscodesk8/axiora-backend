import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './app.register.user.dto';

export class UpdateUserDto extends PartialType(RegisterUserDto) {}