import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeacherGroup } from "../../teacher-groups/entities/teacher-group.entity";
import { Homework } from "../../homework/entities/homework.entity";
import { Grade } from "../../grades/entities/grade.entity";

@ObjectType()
@Entity()
export class Teacher {
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
  subject: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ enum: ["teacher", "assistant"] })
  role: string;

  @Field()
  @Column({ default: false })
  is_active: boolean;

  @Field()
  @Column({ default: "" })
  refresh_token: string;

  @OneToMany(()=>TeacherGroup,(teachergroup)=>teachergroup.teacher)
  teachergroup: TeacherGroup[]


  @OneToMany(()=>Homework,(homework)=>homework.teacher)
  homework:Homework[]


  @OneToMany(()=>Grade,(grade)=>grade.teacher)
  grade:Grade[]

}
