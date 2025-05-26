import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { TeacherGroup } from "../../teacher_groups/entities/teacher_group.entity";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashed_password: string;

  @Column()
  phone: string;

  @Column({ enum: ["teacher", "director"], type: "enum", default: "teacher" })
  role: string;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @Column({ nullable: true })
  hashed_refresh_token: string;

  @OneToMany(() => TeacherGroup, (tg) => tg.teacherId)
  teacherGroups: TeacherGroup[];
}
