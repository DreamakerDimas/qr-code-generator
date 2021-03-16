import { Test, TestingModule } from '@nestjs/testing';
import { PublicLinksController } from './public.links.controller';

describe('LinksController', () => {
  let controller: PublicLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicLinksController],
    }).compile();

    controller = module.get<PublicLinksController>(PublicLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
