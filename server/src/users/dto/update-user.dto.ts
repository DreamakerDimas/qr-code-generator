import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';
import { Role } from '../../constants';
export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  readonly role: Role;
}
