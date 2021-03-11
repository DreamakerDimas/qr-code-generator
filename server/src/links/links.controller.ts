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
import { UpdateLinkDto } from './dto/update-link.dto';
import * as uuid from 'uuid';

@Roles(Role.USER, Role.ADMIN) // !!! change on USER
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('links/user/')
export class LinksController {
  constructor(private linksService: LinksService) {}

  // Role USER
  // GET ALL FOR ME
  @Get()
  async getAll(@Request() req): Promise<Links[] | []> {
    return await this.linksService.getAll(req.user.id);
  }

  // GET ONE OF MY
  @Get(':id')
  async getOne(@Param('id') id: string, @Request() req): Promise<Links | null> {
    return await this.linksService.getOne(id, req.user.id);
  }

  //POST CREATE MY
  @Post()
  async create(@Body() body: CreateLinkDto, @Request() req): Promise<Links> {
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

    return await this.linksService.create(linkObj);
  }

  // PUT UPDATE STATUS OF MY
  @Put()
  async update(@Request() req, @Body() body: UpdateLinkDto): Promise<Links> {
    return await this.linksService.update(body.id, req.user.id, body.isActive);
  }

  // DELETE MY
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return await this.linksService.remove(id, req.user.id);
  }
}
