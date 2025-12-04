import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadsService } from './leads.service';
import { Lead } from '../entities/lead.entity';

describe('LeadsService', () => {
  let service: LeadsService;
  let repository: Repository<Lead>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: getRepositoryToken(Lead),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
              where: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              take: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
              getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
    repository = module.get<Repository<Lead>>(getRepositoryToken(Lead));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
