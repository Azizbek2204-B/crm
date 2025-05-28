import { Field, InputType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

@InputType()
export class CreateScheduleDto {
  @IsNotEmpty()
  @IsInt()
  @Field()
  groupId: number

  @IsNotEmpty()
  @Field()
  @Column()
  dayOfTheWeek: string;

  @Field()
  @Column()
  startTime: string;

  @Field()
  @Column()
  endTime: string;
}
