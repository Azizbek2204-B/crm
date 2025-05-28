import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Admin {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;


  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  password: string;


  @Field()
  @Column({ default: false })
  is_creator: boolean;

  @Field()
  @Column({ default: false })
  is_active: boolean;
  

  @Field()
  @Column({ default: "" })
  refresh_token: string;
}



