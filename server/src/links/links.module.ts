import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/users/users.module';
import { AdminLinksController } from './admin.links.controller';
import { LinksController } from './links.controller';
import { Links } from './links.entity';
import { LinksService } from './links.service';
import { PublicLinksController } from './public.links.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Links]), UserModule],
  controllers: [LinksController, AdminLinksController, PublicLinksController],
  providers: [LinksService],
})
export class LinksModule {}
