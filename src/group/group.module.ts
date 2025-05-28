import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Course } from '../course/entities/course.entity';
import { CourseModule } from '../course/course.module';
import { GroupResolver } from './group.resolver';
import { Schedule } from '../schedule/entities/schedule.entity';
import { StudentGroup } from '../student-groups/entities/student-group.entity';
import { TeacherGroup } from '../teacher-groups/entities/teacher-group.entity';
import { Homework } from '../homework/entities/homework.entity';


@Module({
  imports:[TypeOrmModule.forFeature([
    Group,Course,Schedule,StudentGroup,TeacherGroup,Homework
  ]),CourseModule],
  controllers: [GroupController],
  providers: [GroupService,GroupResolver],
  exports:[GroupService]
})
export class GroupModule {}
