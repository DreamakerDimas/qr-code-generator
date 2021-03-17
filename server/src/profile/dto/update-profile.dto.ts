import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;
}
