import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { HomeworkSubmission } from '../homework-submissions/entities/homework-submission.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Student } from '../students/entities/student.entity';
import { HomeworkSubmissionsModule } from '../homework-submissions/homework-submissions.module';
import { TeacherModule } from '../teacher/teacher.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    Grade,HomeworkSubmission,Teacher,Student
  ]),HomeworkSubmissionsModule,TeacherModule,StudentsModule],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
