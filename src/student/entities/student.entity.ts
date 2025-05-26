import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentGroup } from "../../student_groups/entities/student_group.entity";
import { Attendance } from "../../attendances/entities/attendance.entity";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  hashed_password: string;

  @Column()
  is_active: boolean;

  @Column()
  gender: 'Male' | 'Female';

  @Column()
  date_of_birth: Date;

  @Column()
  avatar_url: string;

  @Column({ nullable: true })
  hashed_refresh_token: string;

  @OneToMany(() => StudentGroup, (studentGroup) => studentGroup.student)
  studentGroups: StudentGroup[];

  @OneToMany(()=>Attendance, (attendance) => attendance.studentId)
  attendances: Attendance[];
}
