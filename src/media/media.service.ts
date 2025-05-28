import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';
import { HomeworkService } from '../homework/homework.service';

@Injectable()
export class MediaService {
  constructor(@InjectRepository(Media) private readonly mediaRepo:Repository<Media>,
  private readonly homeworkService: HomeworkService
  ){}
  async create(createMediaDto: CreateMediaDto) {
   const {homeworkId,...otherDto} = createMediaDto
   const homework = await this.homeworkService.findOne(homeworkId)
   if(!homework){
    throw new BadRequestException("Homework Not Found")
   }
   const media = this.mediaRepo.create({homework,...otherDto})
   return this.mediaRepo.save(media)
  }

  findAll() {
    return this.mediaRepo.find({relations:["homework"]})
  }

  findOne(id: number) {
      return this.mediaRepo.findOne({where:{id}, relations: ["homework"] });
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return this.mediaRepo.preload({id,...updateMediaDto})
  }

  remove(id: number) {
    return this.mediaRepo.delete({id})
  }
}
