import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Student } from '../students/entities/student.entity';
import { Schedule } from '../schedule/entities/schedule.entity';
import { StudentsModule } from '../students/students.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { AttendanceResolver } from './attendance.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([
    Attendance,Student,Schedule
  ]),StudentsModule,ScheduleModule],
  controllers: [AttendanceController],
  providers: [AttendanceService,AttendanceResolver],
})
export class AttendanceModule {}
