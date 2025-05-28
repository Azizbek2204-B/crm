import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Homework } from '../homework/entities/homework.entity';
import { HomeworkModule } from '../homework/homework.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    Media,Homework
  ]),HomeworkModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
