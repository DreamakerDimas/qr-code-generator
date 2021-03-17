import { Inject, Injectable, Request } from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UserService } from '../users/users.service';

@Injectable()
export class ProfileService {
  @Inject() private readonly userService: UserService;

  async getProfile(id: string): Promise<any> {
    const user = await this.userService.getById(id);
    const { password, ...profile } = user;
    return profile;
  }

  async updateProfile(id: string, params: UpdateUserDto) {
    return await this.userService.update(id, params);
  }
}
