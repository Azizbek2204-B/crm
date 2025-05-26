import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../../student/entities/student.entity";
import { Group } from "../../groups/entities/group.entity";

@Entity()
export class StudentGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  period: Date;

  @Column()
  is_active: boolean;

  @ManyToOne(() => Student, (student) => student.studentGroups)
  student: Student;

  @ManyToOne(() => Group, (group) => group.studentGroups)
  group: Group;
}
