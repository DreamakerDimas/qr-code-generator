import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { Links } from './links.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Links)
    readonly linksRepository: Repository<Links>,
  ) {}

  async getAll(userId: string): Promise<Links[] | []> {
    return await this.linksRepository.find({ userId });
  }

  async getOne(id: string, userId: string): Promise<Links | null> {
    return await this.linksRepository.findOne({ id, userId });
  }

  async create(link: CreateLinkDto): Promise<Links> {
    return await this.linksRepository.save(link);
  }

  async update(id, userId, isActive): Promise<Links> {
    await this.linksRepository.update(
      {
        id,
        userId,
      },
      { isActive },
    );
    return await this.linksRepository.findOne({ id, userId });
  }

  async remove(id, userId): Promise<any> {
    return await this.linksRepository.delete({ id, userId });
  }
}
