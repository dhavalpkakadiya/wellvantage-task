import { Test, TestingModule } from '@nestjs/testing';
import { LeadsController } from './leads.controller';
import { LeadsService } from '../services/leads.service';
import { GymsService } from '../../gyms/services/gyms.service';

describe('LeadsController', () => {
  let controller: LeadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [
        {
          provide: LeadsService,
          useValue: {
            createLead: jest.fn(),
            getLeads: jest.fn(),
          },
        },
        {
          provide: GymsService,
          useValue: {
            getGymByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
