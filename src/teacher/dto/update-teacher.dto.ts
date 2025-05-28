import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Role } from "./create-teacher.dto";


@InputType()
export class UpdateTeacherDto {
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
