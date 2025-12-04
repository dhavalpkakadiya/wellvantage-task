import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateGymDto } from '../dto/create-gym.dto';
import { GymsService } from '../services/gyms.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('gym')
export class GymsController {
  constructor(private readonly gymService: GymsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateGymDto, @Req() req) {
    const userId = req.user.id;

    const gym = await this.gymService.createGyms(dto, userId);

    return {
      success: true,
      message: 'Gym created successfully',
      data: gym,
    };
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getGymByUserId(@Param('userId') userId: string) {
    const gym = await this.gymService.getGymByUserId(userId);

    if (!gym) {
      return {
        success: false,
        message: 'Gym not found for this user',
        data: null,
      };
    }

    return {
      success: true,
      message: 'Gym found',
      data: gym,
    };
  }
}
