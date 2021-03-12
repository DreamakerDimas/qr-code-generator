import { IsEmail, IsEnum, IsNotEmpty, Min, MinLength } from 'class-validator';
import { Role } from '../../constants';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @MinLength(6)
  password: string;

  @IsEnum(Role)
  readonly role: Role;
}
