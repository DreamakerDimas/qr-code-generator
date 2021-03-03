import { Role } from '../../constants';
export class UpdateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: Role;
}
