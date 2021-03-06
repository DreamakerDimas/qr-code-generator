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
import { OptionsParam } from 'src/links/dto/id-param-link.dto';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':limit/:offset')
  getAll(@Param() param: OptionsParam): Promise<User[]> {
    return this.userService.getAll(param);
  }

  @Get(':id')
  getOne(@Param() param: IdParam): Promise<User> {
    const { id } = param;
    return this.userService.getById(id);
  }

  @Post('find')
  getMatched(@Body() body): Promise<any> {
    // !!! validate
    const { user, settings } = body;
    return this.userService.getMatched(user, settings);
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
