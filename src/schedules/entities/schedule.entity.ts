import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../groups/entities/group.entity";
import { Attendance } from "../../attendances/entities/attendance.entity";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day_of_week: string;

    @Column()
    start_time: string;

    @Column()
    end_time: string;

    @ManyToOne(()=>Group, (group)=>group.schedules)
    groupId: Group;

    @OneToMany(()=>Attendance, (attendance) => attendance.scheduleId)
    attendances: Attendance[];
}
