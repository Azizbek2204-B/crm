import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Homework } from './entities/homework.entity';
import { Repository } from 'typeorm';
import { TeacherService } from '../teacher/teacher.service';
import { GroupService } from '../group/group.service';

@Injectable()
export class HomeworkService {
  constructor(@InjectRepository(Homework) private readonly homeworkRepo:Repository<Homework>,
  private readonly teacherService:TeacherService,
  private readonly groupService: GroupService
  ){}
  async create(createHomeworkDto: CreateHomeworkDto) {
    const {teacherId,groupId,...otherDto} = createHomeworkDto
   const teacher = await this.teacherService.findOne(teacherId)
   if(!teacher){
    throw new BadRequestException("Teacher Not Found!")
   }
   const group = await this.groupService.findOne(groupId)
   if(!group){
    throw new BadRequestException("Group Not Found!")
   }
   const newHomework = this.homeworkRepo.create({group,teacher,...otherDto})
   return this.homeworkRepo.save(newHomework)
  }

  findAll() {
    return this.homeworkRepo.find({relations:["teacher","group"]})
  }

  findOne(id: number) {
    return this.homeworkRepo.findOne({where:{id}, relations: ["teacher", "group"] });
  }

  update(id: number, updateHomeworkDto: UpdateHomeworkDto) {
     return this.homeworkRepo.preload({id,...updateHomeworkDto})
  }

  remove(id: number) {
    return this.homeworkRepo.delete({id})
  }
}
