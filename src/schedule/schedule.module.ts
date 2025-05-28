import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Group } from '../group/entities/group.entity';
import { GroupModule } from '../group/group.module';
import { Attendance } from '../attendance/entities/attendance.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Schedule,Group,Attendance
  ]),GroupModule],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports:[ScheduleService]
})
export class ScheduleModule {}
