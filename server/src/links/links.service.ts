import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { Links } from './links.entity';
import { uploadFromBuffer, deleteFile } from '../gstorage';
import { toBuffer } from 'qrcode';
import { User } from 'src/users/users.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Links)
    readonly linksRepository: Repository<Links>,
  ) {}

  async getAll(user: object, options): Promise<any> {
    const { limit, offset } = options;

    const linksArr = await this.linksRepository.find({
      where: { user },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    return linksArr;
  }

  async getOne(id: string, user: object): Promise<Links | null> {
    return await this.linksRepository.findOne({ id, user });
  }

  async create(linkObj: CreateLinkDto): Promise<Links> {
    try {
      const link = await this.linksRepository.create(linkObj);
      const { filename } = link;

      // QR generation to buffer and uploading
      toBuffer(link.innerUrl, (err, buffer) => {
        if (err) throw err;
        uploadFromBuffer(filename, buffer);
      });

      return this.linksRepository.save(link);
    } catch (err) {
      await this.linksRepository.delete(linkObj);
      // delete file
      // return err
    }
  }

  async update(id, user, isActive): Promise<Links> {
    await this.linksRepository.update(
      {
        id,
        user,
      },
      { isActive },
    );
    return await this.linksRepository.findOne({ id, user });
  }

  async remove(id, user): Promise<any> {
    const link = await this.linksRepository.findOne({ id, user });

    deleteFile(link.filename);
    return await this.linksRepository.delete({ id, user });
  }
}
