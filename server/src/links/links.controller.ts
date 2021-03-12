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

@Roles(Role.USER, Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('links/user/')
export class LinksController {
  constructor(private linksService: LinksService) {}

  // Role USER
  // GET ALL FOR ME
  @Get()
  getAll(@Request() req, @Body() body): Promise<Links[] | []> {
    return this.linksService.getAll(req.user.id, body);
  }

  // GET ONE OF MY
  @Get(':id')
  getOne(@Param() param: IdParam, @Request() req): Promise<Links | null> {
    const { id } = param;
    return this.linksService.getOne(id, req.user.id);
  }

  //POST CREATE MY
  @Post()
  create(@Body() body: CreateMyLinkBody, @Request() req): Promise<Links> {
    const id = uuid.v4();
    const filename = `${req.user.id}/${id}.png`;
    const fileUrl = `https://storage.cloud.google.com/${process.env.GCLOUD_STORAGE_BUCKET}/${filename}`;
    const innerUrl = `${req.hostname}/redirect/${id}`;

    const linkObj: CreateLinkDto = {
      id,
      name: body.name,
      filename,
      fileUrl,
      innerUrl,
      outerUrl: body.outerUrl,
      userId: req.user.id,
    };

    return this.linksService.create(linkObj);
  }

  // PUT UPDATE STATUS OF MY
  @Put()
  update(@Request() req, @Body() body: UpdateMyLinkDto): Promise<Links> {
    return this.linksService.update(body.id, req.user.id, body.isActive);
  }

  // DELETE MY
  @Delete(':id')
  remove(@Param() param: IdParam, @Request() req) {
    const { id } = param;
    return this.linksService.remove(id, req.user.id);
  }
}
