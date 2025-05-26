import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../../student/entities/student.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    status: string;

    @ManyToOne(() => Student, (student) => student.attendances)
    studentId: Student;

    @ManyToOne(()=>Schedule, (schedule) => schedule.attendances)
    scheduleId: Schedule;
}
