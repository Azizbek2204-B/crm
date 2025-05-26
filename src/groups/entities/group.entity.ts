import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeacherGroup } from "../../teacher_groups/entities/teacher_group.entity";
import { StudentGroup } from "../../student_groups/entities/student_group.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  status: boolean;

  @OneToMany(() => TeacherGroup, (tg) => tg.groupId)
  teacherGroups: TeacherGroup[];

  @OneToMany(() => StudentGroup, (sg) => sg.group)
  studentGroups: StudentGroup[];

  @OneToMany(()=>Schedule, (schedule) => schedule.groupId)
  schedules: Schedule[];
}
