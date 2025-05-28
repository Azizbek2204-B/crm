import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  desciption: string;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  duration: number;


  @IsNotEmpty()
  @IsNumber()
  @Field()
  lessonsInWeek: number;
}
