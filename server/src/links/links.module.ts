import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/users/users.module';
import { AdminLinksController } from './admin.links.controller';
import { LinksController } from './links.controller';
import { Links } from './links.entity';
import { LinksService } from './links.service';

@Module({
  imports: [TypeOrmModule.forFeature([Links]), UserModule],
  controllers: [LinksController, AdminLinksController],
  providers: [LinksService],
})
export class LinksModule {}
