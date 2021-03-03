import { Injectable } from '@nestjs/common';
import QRCode from 'qrcode';

@Injectable()
export class LinksService {
  async generate() {
    const code = QRCode.create('ffff', {});
    console.log(code);
  }
}
