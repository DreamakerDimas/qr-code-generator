import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserModule } from 'src/users/users.module';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [UserModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
