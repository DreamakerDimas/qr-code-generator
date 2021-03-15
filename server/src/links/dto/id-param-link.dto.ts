import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class IdParam {
  @IsUUID()
  readonly id: string;
}

export class UserIdParam {
  @IsUUID()
  readonly userId: string;
}

export class UserIdOptionsParam {
  @IsUUID()
  readonly userId: string;

  @IsString()
  readonly limit: number;

  @IsString()
  readonly offset: number;
}

export class IdAndUserIdParam {
  @IsUUID()
  readonly id: string;

  @IsUUID()
  readonly userId: string;
}
