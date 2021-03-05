import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { FilesInterceptor } from '@nestjs/platform-express';

import { Role } from '../constants';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Links } from './links.entity';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import {
  getIdFromPath,
  userStorageUpload,
} from './storageMulter/storageMulter';

@Roles(Role.ADMIN) // !!! change on USER
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('links')
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

  // POST CREATE MY
  @Post()
  @UseInterceptors(
    FilesInterceptor('file', null, {
      storage: userStorageUpload,
    }),
  )
  async create(
    @UploadedFiles() file,
    @Body() body,
    @Request() req,
  ): Promise<Links> {
    const linkId = getIdFromPath(file);
    const fileUrl = file.pop().path;

    const linkObj: CreateLinkDto = {
      id: linkId,
      name: body.name,
      url: body.origUrl,
      fileUrl: fileUrl,
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
  async remove(@Param() params, @Request() req) {
    // add remove api
    return await this.linksService.remove(params.id, req.user.id);
  }
}
