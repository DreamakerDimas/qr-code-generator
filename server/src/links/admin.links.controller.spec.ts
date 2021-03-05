import { Test, TestingModule } from '@nestjs/testing';
import { AdminLinksController } from './admin.links.controller';

describe('LinksController', () => {
  let controller: AdminLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminLinksController],
    }).compile();

    controller = module.get<AdminLinksController>(AdminLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
