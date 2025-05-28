import { Module } from '@nestjs/common';
import { TeacherGroupsService } from './teacher-groups.service';
import { TeacherGroupsController } from './teacher-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherGroup } from './entities/teacher-group.entity';
import { Group } from '../group/entities/group.entity';
import { Student } from '../students/entities/student.entity';
import { StudentsModule } from '../students/students.module';
import { GroupModule } from '../group/group.module';
import { TeacherGroupsResolver } from './teacher-groups.resolver';
import { TeacherModule } from '../teacher/teacher.module';
import { TeacherService } from '../teacher/teacher.service';
import { Grade } from '../grades/entities/grade.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    TeacherGroup,Group,Student,Grade
  ]),TeacherModule,GroupModule],
  controllers: [TeacherGroupsController],
  providers: [TeacherGroupsService,TeacherGroupsResolver],
})
export class TeacherGroupsModule {}
