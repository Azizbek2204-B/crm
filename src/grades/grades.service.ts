import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Grade } from "./entities/grade.entity";
import { Repository } from "typeorm";
import { StudentsService } from "../students/students.service";
import { TeacherService } from "../teacher/teacher.service";
import { HomeworkSubmissionsService } from "../homework-submissions/homework-submissions.service";

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepo: Repository<Grade>,
    private readonly studentService: StudentsService,
    private readonly teacherService: TeacherService,
    private readonly hsubmissionService: HomeworkSubmissionsService
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    const { teacherId, studentId, hsubmissionId, ...value } = createGradeDto;

    const student = await this.studentService.findOne(studentId);
    if (!student)
      throw new NotFoundException(`Student with id ${studentId} not found`);

    const teacher = await this.teacherService.findOne(teacherId);
    if (!teacher)
      throw new NotFoundException(`Teacher with id ${teacherId} not found`);

    const submission = await this.hsubmissionService.findOne(hsubmissionId);
    if (!submission)
      throw new NotFoundException(
        `Submission with id ${hsubmissionId} not found`
      );

    const grade = this.gradeRepo.create({
      student,
      teacher,
      hsubmission: submission,
      ...value,
    });

    return this.gradeRepo.save(grade);
  }

  findAll() {
    return this.gradeRepo.find({
      relations: ["student", "teacher", "hsubmission"],
    });
  }

  async findOne(id: number) {
    const grade = await this.gradeRepo.findOne({
      where: { id },
      relations: ["student", "teacher", "hsubmission"],
    });
    if (!grade) throw new NotFoundException(`Grade with id ${id} not found`);
    return grade;
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    const grade = await this.gradeRepo.findOne({ where: { id } });
    if (!grade) throw new NotFoundException(`Grade with id ${id} not found`);

    Object.assign(grade, updateGradeDto);
    return this.gradeRepo.save(grade);
  }

  async remove(id: number) {
    const grade = await this.gradeRepo.findOne({ where: { id } });
    if (!grade) throw new NotFoundException(`Grade with id ${id} not found`);
    return this.gradeRepo.remove(grade);
  }
}
