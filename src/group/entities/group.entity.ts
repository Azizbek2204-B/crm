import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../../course/entities/course.entity";
import { Schedule } from "../../schedule/entities/schedule.entity";
import { StudentGroup } from "../../student-groups/entities/student-group.entity";
import { TeacherGroup } from "../../teacher-groups/entities/teacher-group.entity";
import { Homework } from "../../homework/entities/homework.entity";

@ObjectType()
@Entity()
export class Group {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => ID)
  @ManyToOne(() => Course, (course) => course.group)
  course: Course;

  @Field()
  @Column()
  startDate: string;

  @Field()
  @Column()
  endDate: string;

  @Field()
  @Column()
  status: string;

  @OneToMany(() => Schedule, (schedule) => schedule.group)
  schedule: Schedule[];

  @OneToMany(() => StudentGroup, (studentgroup) => studentgroup.group)
  studentgroup: StudentGroup[];

  @OneToMany(() => TeacherGroup, (teachergroup) => teachergroup.teacher)
  teachergroup: TeacherGroup[];

  @OneToMany(() => Homework, (homework) => homework.group)
  homework:Homework[]
}

