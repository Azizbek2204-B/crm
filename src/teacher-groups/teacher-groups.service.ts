import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeacherGroupDto } from './dto/create-teacher-group.dto';
import { UpdateTeacherGroupDto } from './dto/update-teacher-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherGroup } from './entities/teacher-group.entity';
import { Repository } from 'typeorm';
import { GroupService } from '../group/group.service';
import { TeacherService } from '../teacher/teacher.service';

@Injectable()
export class TeacherGroupsService {
  constructor(@InjectRepository(TeacherGroup) private readonly teacherGroupRepo:Repository<TeacherGroup>,
  private readonly groupService:GroupService,
  private readonly teacherService:TeacherService
  ){}
  async create(createTeacherGroupDto: CreateTeacherGroupDto) {
    const {groupId,teacherId} = createTeacherGroupDto
    const teacher = await this.teacherService.findOne(teacherId)
    if(!teacher){
      throw new BadRequestException("Teacher not found")
    }
    const group = await this.groupService.findOne(groupId)
    if(!group){
      throw new BadRequestException("Group Not found!")
    }    
    const teacherGroup = this.teacherGroupRepo.create({
      group,teacher
    });
    return this.teacherGroupRepo.save(teacherGroup)
  }

  findAll() {
    return this.teacherGroupRepo.find({relations:["teacher","group"]})
  }

  findOne(id: number) {
  return this.teacherGroupRepo.findOne({where:{id},relations:["teacher", "group"] });
  }

  update(id: number, updateTeacherGroupDto: UpdateTeacherGroupDto) {
    return this.teacherGroupRepo.preload({id,...updateTeacherGroupDto})
  }

  remove(id: number) {
    return this.teacherGroupRepo.delete({id})
  }
}
