import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { FilesInterceptor } from '@nestjs/platform-express';

import { Role, storageURL } from '../constants';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Links } from './links.entity';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import {
  getIdFromPath,
  userStorageDelete,
  userStorageUpload,
} from './storageMulter/storageMulter';

import fs from 'fs';

@Roles(Role.ADMIN) // !!! change on USER
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}

  // Role USER
  // GET ALL
  @Get()
  async getAll(@Request() req) {
    return await this.linksService.getAll(req.user.id);
  }

  // GET ONE
  @Get(':id')
  async getOne(@Param() params, @Request() req) {
    return await this.linksService.getOne(params.id, req.user.id);
  }

  // POST CREATE
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
    console.log(body);
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

  // PUT UPDATE
  @Put()
  async update(@Request() req, @Body() body: UpdateLinkDto) {
    return await this.linksService.update(body.id, req.user.id, body.isActive);
  }

  // DELETE
  @Delete(':id')
  async remove(@Param() params, @Request() req) {
    const removeFile = async () => {
      const path = storageURL + `${req.user.id}/${params.id}-${req.user.id}*`;

      return await fs.unlink(path, null);
    };
    return await this.linksService.remove(params.id, req.user.id, removeFile);
  }
}

// filename: (req, file, cb) => {
//     const fileNameSplit = file.originalname.split('.');
//     const fileExt = fileNameSplit.pop();
//     cb(null, `${req.body.userId}/${Date.now()}-${req.body.userId}.${fileExt}`);
//   },
