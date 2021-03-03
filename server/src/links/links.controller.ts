import { Controller, Get } from '@nestjs/common';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Get()
  get() {
    this.linksService.generate();
  }
}
