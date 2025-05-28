import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, isPhoneNumber, IsString } from "class-validator";

export enum Role {
  TEACHER = "teacher",
  ASSISTANT = "assistant",
}
@InputType()
export class CreateTeacherDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  @Field()
  lastName: string;
  @IsEmail()
  @Field()
  email: string;
  @IsNotEmpty()
  @IsPhoneNumber("UZ")
  @Field()
  phone: string;
  @IsNotEmpty()
  @IsString()
  @Field()
  subject: string;
  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
  @IsNotEmpty()
  @IsString()
  @Field()
  confirm_password: string;
  @IsNotEmpty()
  @IsEnum(Role)
  @Field()
  role: Role;
}
