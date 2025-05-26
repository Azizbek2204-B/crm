import { Module } from '@nestjs/common';
import { StudentGroupsService } from './student_groups.service';
import { StudentGroupsController } from './student_groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentGroup } from './entities/student_group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentGroup])],
  controllers: [StudentGroupsController],
  providers: [StudentGroupsService],
})
export class StudentGroupsModule {}
