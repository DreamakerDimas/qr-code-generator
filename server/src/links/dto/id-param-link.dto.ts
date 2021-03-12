import { IsUUID } from 'class-validator';

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
