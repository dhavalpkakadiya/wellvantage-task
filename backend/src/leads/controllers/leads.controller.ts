import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { LeadsService } from '../services/leads.service';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import { GymsService } from '../../gyms/services/gyms.service';
import { Gym } from '../../gyms/entities/gym.entity';

@Controller('lead')
export class LeadsController {
  constructor(
    private readonly leadsService: LeadsService,
    private readonly gymsService: GymsService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateLeadDto, @CurrentUser() user: User) {
    let gym: Gym | null = user.gym || null;
    if (!gym) {
      gym = await this.gymsService.getGymByUserId(user.id);
    }

    if (!gym) {
      throw new BadRequestException('User does not have an associated gym');
    }

    const lead = await this.leadsService.createLead({
      ...dto,
      gymId: gym.id,
    });

    return {
      success: true,
      message: 'Lead created successfully',
      data: lead,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getLeads(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
    @CurrentUser() user: User,
  ) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    let gym: Gym | null = user.gym || null;
    if (!gym) {
      gym = await this.gymsService.getGymByUserId(user.id);
    }

    if (!gym) {
      throw new BadRequestException('User does not have an associated gym');
    }

    const leadsData = await this.leadsService.getLeads(
      pageNumber,
      limitNumber,
      search,
      gym.id,
    );

    return {
      success: true,
      message: leadsData.data.length
        ? 'Leads fetched successfully'
        : 'No leads found',
      data: leadsData.data,
      total: leadsData.total,
      page: leadsData.page,
      limit: leadsData.limit,
    };
  }
}
