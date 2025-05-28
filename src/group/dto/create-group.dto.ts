import { Field, InputType } from "@nestjs/graphql";
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsInt,
} from "class-validator";

@InputType()
export class CreateGroupDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsInt()
  courseId: number;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  status: string;
}
