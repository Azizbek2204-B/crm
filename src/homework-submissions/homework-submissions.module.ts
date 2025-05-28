import { Module } from '@nestjs/common';
import { HomeworkSubmissionsService } from './homework-submissions.service';
import { HomeworkSubmissionsController } from './homework-submissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeworkSubmission } from './entities/homework-submission.entity';
import { Homework } from '../homework/entities/homework.entity';
import { Student } from '../students/entities/student.entity';
import { HomeworkModule } from '../homework/homework.module';
import { StudentsModule } from '../students/students.module';
import { Grade } from '../grades/entities/grade.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    HomeworkSubmission,Homework,Student,Grade
  ]),HomeworkModule,StudentsModule],
  controllers: [HomeworkSubmissionsController],
  providers: [HomeworkSubmissionsService],
  exports:[HomeworkSubmissionsService]
})
export class HomeworkSubmissionsModule {}
