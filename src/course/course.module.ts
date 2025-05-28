import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CourseResolver } from './course.resolver';
import { Group } from '../group/entities/group.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Course,Group
  ])],
  controllers: [CourseController],
  providers: [CourseService,CourseResolver],
  exports:[CourseService]
})
export class CourseModule {}
