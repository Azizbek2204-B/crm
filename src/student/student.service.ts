import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>
  ) {}

  create(createStudentDto: CreateStudentDto) {
    return this.studentRepository.create(createStudentDto);
  }

  findAll() {
    return this.studentRepository.find();
  }

  findOne(id: number) {
    return this.studentRepository.findOne({ where: { id } });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.studentRepository.update(id, updateStudentDto);
  }

  remove(id: number) {
    return this.studentRepository.delete(id);
  }

  findByEmail(email: string) {
    return this.studentRepository.findOne({ where: { email } });
  }

  async updateRefreshToken(studentId: number, hashed_refresh_token: string){
    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (student) {
      student.hashed_refresh_token = hashed_refresh_token;
      return this.studentRepository.save(student);
    }
    return null;
  }
}
