import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { GroupService } from '../group/group.service';

@Injectable()
export class ScheduleService {
  constructor(@InjectRepository(Schedule) private readonly scheduleRepo:Repository<Schedule>,
  private readonly groupService:GroupService
  ){}
  async create(createScheduleDto: CreateScheduleDto) {
   const {groupId,...otherDto} = createScheduleDto
    const group  = await this.groupService.findOne(groupId)
    if(!group){
      throw new BadRequestException("Group Not Found")
    }
    const schedule = this.scheduleRepo.create({group:group,...otherDto})
    return this.scheduleRepo.save(schedule)
    }

  findAll() {
    return this.scheduleRepo.find({relations:["group"]})
  }

  findOne(id: number) {
    return this.scheduleRepo.findOne({where:{id}, relations: ["group"] });
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleRepo.preload({id,...updateScheduleDto})
  }

  remove(id: number) {
    return this.scheduleRepo.delete({id})
  }
}
