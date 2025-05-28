import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>,
    private readonly jwtService: JwtService
  ) {}
  async create(createTeacherDto: CreateTeacherDto) {
    if(createTeacherDto.password!==createTeacherDto.confirm_password){
      throw new BadRequestException("Password Does not Match!")
    }
    const { password, ...otherDto } = createTeacherDto;
    const hashed_password = await bcrypt.hash(password, 7);
    const newTeacher = await this.teacherRepo.save({
      password: hashed_password,
      ...otherDto,
    });
    return newTeacher;
  }

  findAll() {
    return this.teacherRepo.find({});
  }

  findOne(id: number) {
    return this.teacherRepo.findOne({ where: { id } });
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherRepo.update(id, updateTeacherDto);
  }

  remove(id: number) {
    return this.teacherRepo.delete(id);
  }
  findByEmail(email: string) {
    return this.teacherRepo.findOne({ where: { email } });
  }
  async save(teacher: Teacher) {
    return this.teacherRepo.save(teacher);
  }
  async findByToken(refreshToken:string){
     if(!refreshToken){
      throw new NotFoundException("Refresh Token Not Found!")
     }
    try {
       const decoded = this.jwtService.verify(refreshToken,{
        secret:process.env.REFRESH_TOKEN_KEY,
       }) as {id:number}
       const teacher = await this.findOne(decoded.id)
       return teacher
    } catch (error) {
       throw new BadRequestException("Invalid or expired refresh token!");
    }
  }
}
