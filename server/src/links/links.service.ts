import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Links } from './links.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Links)
    readonly linksRepository: Repository<Links>,
  ) {}

  async getAll(userId) {
    return await this.linksRepository.find({ userId });
  }

  async getOne(id, userId) {
    return await this.linksRepository.findOne({ id, userId });
  }

  async create(link): Promise<Links> {
    return await this.linksRepository.save(link);
  }

  async update(id, userId, isActive): Promise<any> {
    await this.linksRepository.update(
      {
        id,
        userId,
      },
      { isActive },
    );
    return await this.linksRepository.findOne({ id, userId });
  }

  async remove(id, userId, removeFile?): Promise<any> {
    const deleted = await this.linksRepository.delete({ id, userId });
    if (deleted.affected > 0) await removeFile();
    return deleted;
  }
}
