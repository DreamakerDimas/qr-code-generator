import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import { UserService } from '../users/users.service';
import { checkPass } from '../functions';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email }, true);
    let result = null;

    await checkPass(pass, user.password).then((isValid) => {
      if (isValid) {
        const { password, ...data } = user;
        result = data;
      }
    });
    return result;
  }

  async login(user: User) {
    const { id, email, role } = user;
    const payload = { sub: id, email, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
