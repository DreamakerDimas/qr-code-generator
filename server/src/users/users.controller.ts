import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult } from 'typeorm';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../constants';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { IdParam } from './dto/id-param.dto';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(@Body() body): Promise<User[]> {
    // !!! body - options
    return this.userService.getAll(body);
  }

  @Get(':id')
  getOne(@Param() param: IdParam): Promise<User> {
    const { id } = param;
    return this.userService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  update(
    @Param() param: IdParam,
    @Body() user: UpdateUserDto,
  ): Promise<User | null> {
    const { id } = param;
    return this.userService.update(id, user);
  }

  @Delete(':id')
  delete(@Param() param: IdParam): Promise<DeleteResult> {
    const { id } = param;
    return this.userService.remove(id);
  }
}
