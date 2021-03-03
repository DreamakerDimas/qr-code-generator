import { Role } from '../../constants';
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: Role;
}
