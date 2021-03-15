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
import { LinksService } from './links.service';
import { Role } from '../constants';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Links } from './links.entity';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateMyLinkDto } from './dto/update-link.dto';
import * as uuid from 'uuid';
import { IdParam } from './dto/id-param-link.dto';
import { CreateMyLinkBody } from './dto/create-link-body.dto';
import { UserService } from 'src/users/users.service';

@Roles(Role.USER, Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('links/user/')
export class LinksController {
  constructor(
    private linksService: LinksService,
    private userService: UserService,
  ) {}

  // Role USER
  // GET ALL FOR MY
  @Get(':limit/:offset')
  getAll(@Request() req, @Param() param): Promise<any> {
    console.log(param);
    return this.linksService.getAll(req.user.id, param);
  }

  // GET ONE OF MY
  @Get(':id')
  getOne(@Param() param: IdParam, @Request() req): Promise<Links | null> {
    const { id } = param;
    return this.linksService.getOne(id, req.user.id);
  }

  //POST CREATE MY
  @Post()
  async create(@Body() body: CreateMyLinkBody, @Request() req): Promise<Links> {
    const id = uuid.v4();
    const filename = `${req.user.id}/${id}.png`;
    const fileUrl = `https://storage.cloud.google.com/${process.env.GCLOUD_STORAGE_BUCKET}/${filename}`;
    const innerUrl = `${req.hostname}/redirect/${id}`;

    const user = await this.userService.getById(req.user.id);

    const linkObj: CreateLinkDto = {
      id,
      name: body.name,
      filename,
      fileUrl,
      innerUrl,
      outerUrl: body.outerUrl,
      user,
    };

    return this.linksService.create(linkObj);
  }

  // PUT UPDATE STATUS OF MY
  @Put()
  update(@Request() req, @Body() body: UpdateMyLinkDto): Promise<Links> {
    const user = { id: req.user.id };
    return this.linksService.update(body.id, user, body.isActive);
  }

  // DELETE MY
  @Delete(':id')
  remove(@Param() param: IdParam, @Request() req) {
    const { id } = param;
    const user = { id: req.user.id };
    return this.linksService.remove(id, user);
  }
}
