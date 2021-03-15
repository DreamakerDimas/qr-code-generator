import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/users/users.entity';
import { UserService } from 'src/users/users.service';
import { ProfileService } from './profile.service';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@Request() req): Promise<any> {
    const { id } = req.user;
    return this.profileService.getProfile(id);
  }

  @Put()
  updateProfile(@Body() params, @Request() req): Promise<any> {
    // !!! params - User
    const { id } = req.user;
    return this.profileService.updateProfile(id, params);
  }
}
