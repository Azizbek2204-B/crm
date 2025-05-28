import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { CourseService } from '../course/course.service';

@Injectable()
export class GroupService {
  constructor(@InjectRepository(Group) private readonly groupRepo:Repository<Group>,
              private readonly  courseService:CourseService
   ){}
  async create(createGroupDto: CreateGroupDto) {
   const {courseId, ...otherDto}  = createGroupDto
   const course = await this.courseService.findOne(courseId)
   if(!course){
    throw new BadRequestException("Course not found with the given ID")
   }
   const group = this.groupRepo.create({course,...otherDto})
   return this.groupRepo.save(group)
  }

  findAll() {
    return this.groupRepo.find({relations:["course"]})
  }

  findOne(id: number) {
    return this.groupRepo.findOne({where:{id}, relations:["course"]})
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.groupRepo.preload({id,...updateGroupDto})
  }

  remove(id: number) {
    return this.groupRepo.delete({id})
  }
}
