import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserController } from './users.controller';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
