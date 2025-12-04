import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsController } from './controllers/leads.controller';
import { LeadsService } from './services/leads.service';
import { Lead } from './entities/lead.entity';
import { GymsModule } from '../gyms/gyms.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lead]), GymsModule],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
