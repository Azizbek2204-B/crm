import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Group } from "../../group/entities/group.entity";

@ObjectType()
@Entity()
export class TeacherGroup {
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Teacher,(teacher)=>teacher.teachergroup)
    teacher:Teacher


    @ManyToOne(()=>Group,(group)=>group.teachergroup)
    group:Group
}
