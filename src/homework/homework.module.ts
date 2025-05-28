import { Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homework } from './entities/homework.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Group } from '../group/entities/group.entity';
import { GroupModule } from '../group/group.module';
import { TeacherModule } from '../teacher/teacher.module';
import { HomeworkSubmission } from '../homework-submissions/entities/homework-submission.entity';
import { Media } from '../media/entities/media.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Homework,Teacher,Group,HomeworkSubmission,Media
  ]),GroupModule,TeacherModule],
  controllers: [HomeworkController],
  providers: [HomeworkService],
  exports:[HomeworkService]
})
export class HomeworkModule {}
