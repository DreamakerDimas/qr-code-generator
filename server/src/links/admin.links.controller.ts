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

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('links/admin')
export class AdminLinksController {
  constructor(private linksService: LinksService) {}

  // Role: ADMIN
  // GET ALL
  @Get(':userId')
  async getAll(@Param('userId') userId: string): Promise<Links[] | []> {
    return await this.linksService.getAll(userId);
  }

  // GET ONE
  @Get(':userId/:id')
  async getOne(
    @Param('userId') userId: string,
    @Param('id') id: string,
  ): Promise<Links | null> {
    return await this.linksService.getOne(id, userId);
  }

  // POST CREATE
  @Post()
  async create(@Body() body, @Request() req): Promise<Links> {
    const id = uuid.v4();
    const filename = `${body.userId}/${id}.png`;
    const fileUrl = `https://storage.cloud.google.com/${process.env.GCLOUD_STORAGE_BUCKET}/${filename}`;
    const innerUrl = `${req.hostname}/redirect/${id}`;

    const linkObj: CreateLinkDto = {
      id,
      name: body.name,
      filename,
      fileUrl,
      innerUrl,
      outerUrl: body.outerUrl,
      userId: body.userId,
    };

    return await this.linksService.create(linkObj);
  }

  // PUT UPDATE
  @Put()
  async update(@Body() body: UpdateLinkDto): Promise<Links> {
    return await this.linksService.update(body.id, body.userId, body.isActive);
  }

  // DELETE
  @Delete()
  async remove(@Body() body): Promise<any> {
    return await this.linksService.remove(body.id, body.userId);
  }
}
