import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gym } from '../entities/gym.entity';
import { CreateGymDto } from '../dto/create-gym.dto';

@Injectable()
export class GymsService {
  constructor(
    @InjectRepository(Gym)
    private gymRepo: Repository<Gym>,
  ) {}

  async createGyms(data: any, userId: string) {
    const existingGym = await this.gymRepo.findOne({
      where: { userId },
    });

    if (existingGym) {
      await this.gymRepo.update(existingGym.id, data);
      return this.gymRepo.findOne({ where: { id: existingGym.id } });
    }

    const gym = this.gymRepo.create({
      ...data,
      userId,
    });

    return await this.gymRepo.save(gym);
  }

  async getGymByUserId(userId: string) {
    return await this.gymRepo.findOne({
      where: { userId },
      relations: ['user'],
    });
  }

  async createInitialGym(userId: string) {
    const existingGym = await this.gymRepo.findOne({
      where: { userId },
    });

    if (existingGym) {
      return existingGym;
    }

    const gym = this.gymRepo.create({
      userId,
    });
    return await this.gymRepo.save(gym);
  }
}
