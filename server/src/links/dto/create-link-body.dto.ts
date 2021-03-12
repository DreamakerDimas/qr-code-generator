import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMyLinkBody {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly outerUrl: string;
}

export class CreateLinkBody {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly outerUrl: string;

  @IsUUID()
  readonly userId: string;
}
