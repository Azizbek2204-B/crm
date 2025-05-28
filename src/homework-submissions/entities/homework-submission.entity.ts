import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Homework } from "../../homework/entities/homework.entity";
import { Student } from "../../students/entities/student.entity";
import { Grade } from "../../grades/entities/grade.entity";
import { Media } from "../../media/entities/media.entity";

@Entity()
export class HomeworkSubmission {
    @PrimaryGeneratedColumn()
    id:number


    @ManyToOne(()=>Homework,(homework)=>homework.hsubmission)
    homework:Homework


    @ManyToOne(()=>Student,(student)=>student.hsubmission)
    student:Student

    @Column()
    fileUrl:string

    @Column()
    submittedAt:Date


    @Column()
    comment:string


    @Column({enum:["passed","rejected","waiting","notgiven"]})
    status:string

    @OneToMany(()=>Grade,(grade)=>grade.hsubmission)
    grade:Grade[]     
}

