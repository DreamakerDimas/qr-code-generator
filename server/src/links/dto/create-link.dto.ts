import { IsNotEmpty, IsObject, IsString, IsUUID } from 'class-validator';
import { User } from 'src/users/users.entity';

export class CreateLinkDto {
  @IsUUID()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly filename: string;

  @IsString()
  @IsNotEmpty()
  readonly innerUrl: string;

  @IsString()
  @IsNotEmpty()
  readonly outerUrl: string;

  @IsString()
  @IsNotEmpty()
  readonly fileUrl: string;

  @IsObject()
  readonly user: User;
}
