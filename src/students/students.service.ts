import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    private readonly jwtService: JwtService
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const {password,confirm_password,...otherData} = createStudentDto
    if(password!==confirm_password){
      throw new BadRequestException("Password does not match!")
    }
    const hashed_password = await bcrypt.hash(createStudentDto.password,7)
    const newStudent = await this.studentRepo.save({password:hashed_password,...otherData});
    return newStudent
  }

  findAll() {
    return this.studentRepo.find({});
  }

  findOne(id: number) {
    return this.studentRepo.findOneBy({ id });
  }
  findByEmail(email: string) {
    return this.studentRepo.findOneBy({ email });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.studentRepo.preload({ id, ...updateStudentDto });
  }

  remove(id: number) {
    return this.studentRepo.delete({ id });
  }
  async save(student: Student) {
    return this.studentRepo.save(student);
  }

  async findByToken(refreshToken: string) {
    if (!refreshToken) {
      throw new NotFoundException("Refresh Token Not Found!");
    }
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      }) as { id: number };
      const admin = await this.findOne(decoded.id);
      return admin;
    } catch (error) {
      throw new BadRequestException("Invalid or expired refresh token!");
    }
  }
}
