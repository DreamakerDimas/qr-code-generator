import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class IdParam {
  @IsUUID()
  readonly id: string;
}

export class UserIdParam {
  @IsUUID()
  readonly userId: string;
}

export class IdAndUserIdParam {
  @IsUUID()
  readonly id: string;

  @IsUUID()
  readonly userId: string;
}

export class OptionsParam {
  // !!! move to common dto's
  @IsString()
  readonly limit: number;

  @IsString()
  readonly offset: number;
}
export class UserIdOptionsParam {
  // implements/extends OptionsParam?
  @IsUUID()
  readonly userId: string;

  @IsString()
  readonly limit: number;

  @IsString()
  readonly offset: number;
}
