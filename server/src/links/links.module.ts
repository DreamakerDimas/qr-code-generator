import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminLinksController } from './admin.links.controller';
import { LinksController } from './links.controller';
import { Links } from './links.entity';
import { LinksService } from './links.service';

@Module({
  imports: [TypeOrmModule.forFeature([Links])],
  controllers: [LinksController, AdminLinksController],
  providers: [LinksService],
})
export class LinksModule {}
