import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

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

  @IsUUID()
  readonly userId: string;
}
