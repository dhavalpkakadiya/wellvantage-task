import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GymsService } from './gyms.service';
import { Gym } from '../entities/gym.entity';

describe('GymsService', () => {
  let service: GymsService;
  let repository: Repository<Gym>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GymsService,
        {
          provide: getRepositoryToken(Gym),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GymsService>(GymsService);
    repository = module.get<Repository<Gym>>(getRepositoryToken(Gym));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
