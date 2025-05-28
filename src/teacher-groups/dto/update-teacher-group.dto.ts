import { Field, InputType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateTeacherGroupDto {
  @IsNotEmpty()
  @IsInt()
  @Field()
  teacherId: number;

  @IsNotEmpty()
  @IsInt()
  @Field()
  groupId: number;
}
