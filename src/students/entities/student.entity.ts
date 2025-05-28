import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendance } from "../../attendance/entities/attendance.entity";
import { StudentGroup } from "../../student-groups/entities/student-group.entity";
import { HomeworkSubmission } from "../../homework-submissions/entities/homework-submission.entity";
import { Grade } from "../../grades/entities/grade.entity";

@ObjectType()
@Entity()
export class Student {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ default: false })
  is_active: boolean;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column()
  dateOfBirth: Date;

  @Field()
  @Column()
  avatar_url: string;

  @Field()
  @Column({ default: "" })
  refresh_token: string;

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendance: Attendance[];

  @OneToMany(() => StudentGroup, (studentgroup) => studentgroup.student)
  studentgroup: StudentGroup[];

  @OneToMany(()=>HomeworkSubmission,(hsubmission)=>hsubmission.student)
  hsubmission:HomeworkSubmission[]


  @OneToMany(()=>Grade,(grade)=>grade.student)
  grade:Grade[]
}



