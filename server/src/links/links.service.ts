import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { Links } from './links.entity';
import { uploadFromBuffer, deleteFile, downloadFile } from '../gstorage';
import { toBuffer } from 'qrcode';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Links)
    readonly linksRepository: Repository<Links>,
  ) {}

  async getAll(userId: string, options): Promise<any> {
    const { limit, offset } = options;

    const linksArr = await this.linksRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    return linksArr;
  }

  async getOne(id: string, userId: string): Promise<Links | null> {
    return await this.linksRepository.findOne({ id, userId });
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
    const link = await this.linksRepository.findOne({ id });

    deleteFile(link.filename);
    return await this.linksRepository.delete({ id, userId });
  }
}
