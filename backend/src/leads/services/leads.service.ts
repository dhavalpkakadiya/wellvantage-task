import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Lead } from '../entities/lead.entity';
import { CreateLeadDto } from '../dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepo: Repository<Lead>,
  ) {}

  async createLead(dto: CreateLeadDto) {
    const leadData: DeepPartial<Lead> = {
      gymId: dto.gymId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      email: dto.email,
      gender: dto.gender,
      dateOfBirth: dto.dateOfBirth,
      height: dto.height,
      heightUnit: dto.heightUnit ?? 'cm',
      weight: dto.weight,
      weightUnit: dto.weightUnit ?? 'kg',
      preferences: dto.preferences,
      inquiryDate: dto.inquiryDate ? new Date(dto.inquiryDate) : undefined,
      assignedTo: dto.assignedTo,
      interestLevel: dto.interestLevel,
      followUpStatus: dto.followUpStatus,
      preferredPackage: dto.preferredPackage,
      preferredPtPackage: dto.preferredPtPackage,
      howTheyHeard: dto.howTheyHeard,
      customNotes: dto.customNotes ?? [],
    };
    const lead = this.leadRepo.create(leadData);

    return await this.leadRepo.save(lead);
  }

  async getLeads(
    page: number = 1,
    limit: number = 10,
    search?: string,
    gymId?: string,
  ): Promise<{ data: Lead[]; total: number; page: number; limit: number }> {
    const query = this.leadRepo.createQueryBuilder('lead');

    if (gymId) {
      query.where('lead.gymId = :gymId', { gymId });
    }

    if (search) {
      const searchCondition = 'lead.firstName ILIKE :search';

      query.where(searchCondition, { search: `${search}%` });
    }

    query.skip((page - 1) * limit).take(limit);

    query.orderBy('lead.createdAt', 'DESC');

    const [data, total] = await query.getManyAndCount();

    return { data, total, page, limit };
  }
}
