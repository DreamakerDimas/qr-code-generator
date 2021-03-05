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
import { FilesInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/constants';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Links } from './links.entity';
import { LinksService } from './links.service';
import {
  adminStorageUpload,
  getIdFromPath,
} from './storageMulter/storageMulter';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('links/admin')
export class AdminLinksController {
  constructor(private linksService: LinksService) {}

  // Role: ADMIN
  // GET ALL
  @Get(':userId')
  async getAll(@Param() params): Promise<Links[] | []> {
    return await this.linksService.getAll(params.userId);
  }

  // GET ONE
  @Get(':userId/:id')
  async getOne(@Param() params): Promise<Links | null> {
    return await this.linksService.getOne(params.id, params.userId);
  }

  // POST CREATE
  @Post()
  @UseInterceptors(
    FilesInterceptor('file', null, {
      storage: adminStorageUpload,
    }),
  )
  async create(@UploadedFiles() file, @Body() body): Promise<Links> {
    const linkId = getIdFromPath(file);
    const fileUrl = file.pop().path;

    const linkObj: CreateLinkDto = {
      id: linkId,
      name: body.name,
      url: body.origUrl,
      fileUrl: fileUrl,
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
  @Delete(':id')
  async remove(@Body() body): Promise<any> {
    return await this.linksService.remove(body.id, body.userId);
  }
}
