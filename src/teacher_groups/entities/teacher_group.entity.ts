import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Group } from "../../groups/entities/group.entity";

@Entity()
export class TeacherGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Teacher, (teacher) => teacher.teacherGroups)
    teacherId: Teacher;

    @ManyToOne(() => Group, (group) => group.teacherGroups)
    groupId: Group;
}
