import { Controller, Get, Param } from '@nestjs/common';
import { IdParam } from 'src/users/dto/id-param.dto';
import { LinksService } from './links.service';

@Controller('links/public')
export class PublicLinksController {
  constructor(private linksService: LinksService) {}

  // GET ONE
  @Get(':id')
  async getOne(@Param() param: IdParam): Promise<any> {
    const { id } = param;
    const link = await this.linksService.getOnePublic(id);

    if (!link.isActive) {
      const { outerUrl, ...data } = link;
      return data;
    }

    return link;
  }
}
