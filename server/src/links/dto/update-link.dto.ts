import { IsBoolean, IsUUID } from 'class-validator';

export class UpdateLinkDto {
  @IsUUID()
  readonly id: string;

  @IsBoolean()
  readonly isActive: boolean;

  @IsUUID()
  readonly userId: string;
}

export class UpdateMyLinkDto {
  @IsUUID()
  readonly id: string;

  @IsBoolean()
  readonly isActive: boolean;
}
