import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../../students/entities/student.entity";
import { HomeworkSubmission } from "../../homework-submissions/entities/homework-submission.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id:number


    @ManyToOne(()=>Student,(student)=>student.grade)
    student:Student

    @ManyToOne(()=>HomeworkSubmission,(hsubmission)=>hsubmission.grade)
    hsubmission:HomeworkSubmission


    @ManyToOne(()=>Teacher,(teacher)=>teacher.grade)
    teacher:Teacher

    @Column()
    grade:number

    @Column()
    date:Date

    @Column()
    comment:string
}
