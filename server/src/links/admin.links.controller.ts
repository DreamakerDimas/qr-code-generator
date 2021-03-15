import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/constants';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Links } from './links.entity';
import { LinksService } from './links.service';
import * as uuid from 'uuid';
import { UserIdParam, IdAndUserIdParam } from './dto/id-param-link.dto';
import { CreateLinkBody } from './dto/create-link-body.dto';
import { UserService } from 'src/users/users.service';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('links/admin')
export class AdminLinksController {
  constructor(
    private linksService: LinksService,
    private userService: UserService,
  ) {}

  // Role: ADMIN
  // GET ALL
  @Get(':userId')
  async getAll(
    @Param() param: UserIdParam,
    @Body() body,
  ): Promise<Links[] | []> {
    const { userId } = param;
    const user = { id: userId };
    // !!! body - options
    return await this.linksService.getAll(user, body);
  }

  // GET ONE
  @Get(':userId/:id')
  async getOne(@Param() param: IdAndUserIdParam): Promise<Links | null> {
    const { id, userId } = param;
    const user = { id: userId };
    return await this.linksService.getOne(id, user);
  }

  // POST CREATE
  @Post()
  async create(@Body() body: CreateLinkBody, @Request() req): Promise<Links> {
    const id = uuid.v4();
    const filename = `${body.userId}/${id}.png`;
    const fileUrl = `https://storage.cloud.google.com/${process.env.GCLOUD_STORAGE_BUCKET}/${filename}`;
    const innerUrl = `${req.hostname}/redirect/${id}`;

    const user = await this.userService.getById(body.userId);

    const linkObj: CreateLinkDto = {
      id,
      name: body.name,
      filename,
      fileUrl,
      innerUrl,
      outerUrl: body.outerUrl,
      user,
    };

    return await this.linksService.create(linkObj);
  }

  // PUT UPDATE
  @Put()
  async update(@Body() body: UpdateLinkDto): Promise<Links> {
    const user = { id: body.userId };
    return await this.linksService.update(body.id, user, body.isActive);
  }

  // DELETE
  @Delete(':userId/:id')
  async remove(@Param() param: IdAndUserIdParam): Promise<any> {
    const { id, userId } = param;
    return await this.linksService.remove(id, userId);
  }
}
