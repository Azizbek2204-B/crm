import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentsResolver } from './students.resolver';
import { Attendance } from '../attendance/entities/attendance.entity';
import { StudentGroup } from '../student-groups/entities/student-group.entity';
import { TeacherGroup } from '../teacher-groups/entities/teacher-group.entity';
import { HomeworkSubmission } from '../homework-submissions/entities/homework-submission.entity';
import { Grade } from '../grades/entities/grade.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Student,Attendance,StudentGroup,TeacherGroup,HomeworkSubmission,Grade
  ])],
  controllers: [StudentsController],
  providers: [StudentsService,StudentsResolver],
  exports:[StudentsService]
})
export class StudentsModule {}
