import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../group/entities/group.entity";

@ObjectType()
@Entity()
export class Course {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  desciption: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  duration: number;

  @Field()
  @Column()
  lessonsInWeek: number

  @OneToMany(()=>Group,(group)=>group.course)
  group:Group[]
}
