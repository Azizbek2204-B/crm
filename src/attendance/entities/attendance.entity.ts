import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../../students/entities/student.entity";
import { Schedule } from "../../schedule/entities/schedule.entity";

@ObjectType()
@Entity()
export class Attendance {
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id:number


    @ManyToOne(()=>Student,(student)=>student.attendance)
    student:Student


    @ManyToOne(()=>Schedule,(schedule)=>schedule.attendance)
    schedule:Schedule


    @Field()
    @Column()
    date:Date

    @Field()
    @Column()
    status:string
}
