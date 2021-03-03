import { Inject, Injectable, Request } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UserService } from '../users/users.service';

@Injectable()
export class ProfileService {
  @Inject() private readonly userService: UserService;

  async getProfile(id: string): Promise<User> {
    return await this.userService.getById(id);
  }

  async updateProfile(id: string, params: User) {
    return await this.userService.update(id, params);
  }
}
