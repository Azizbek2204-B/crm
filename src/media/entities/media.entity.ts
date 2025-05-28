import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Homework } from "../../homework/entities/homework.entity";
import { HomeworkSubmission } from "../../homework-submissions/entities/homework-submission.entity";

@Entity()
export class Media {

    @PrimaryGeneratedColumn()
    id:number


    @ManyToOne(()=>Homework,(homework)=>homework.media)
    homework:Homework

    @Column()
    files:string

    @Column()
    type:string


    @Column()
    filename:string

    @Column()
    size:number
    
}
