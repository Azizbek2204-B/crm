import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const teacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(teacher);
  }

  findAll() {
    return this.teacherRepository.find();
  }

  findOne(id: number) {
    return this.teacherRepository.findOne({ where: { id } });
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherRepository.update(id, updateTeacherDto);
  }

  remove(id: number) {
    return this.teacherRepository.delete(id);
  }

  async updateRefreshToken(teacherId: number, hashed_refresh_token: string) {
    await this.teacherRepository.update(teacherId, { hashed_refresh_token });
  }

  findByEmail(email: string) {
    return this.teacherRepository.findOne({ where: { email } });
  }
}
