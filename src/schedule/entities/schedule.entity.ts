import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../group/entities/group.entity";
import { Attendance } from "../../attendance/entities/attendance.entity";
@ObjectType()
@Entity()
export class Schedule {

    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id:number


    @ManyToOne(()=>Group,(group)=>group.schedule)
    group:Group


    @Field()
    @Column()
    dayOfTheWeek:string


    @Field()
    @Column()
    startTime:string


    @Field()
    @Column()
    endTime:string


    @OneToMany(()=>Attendance,(attendance)=>attendance.schedule)
    attendance:Attendance[]
}
