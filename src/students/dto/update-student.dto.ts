import { Field, InputType } from "@nestjs/graphql";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  isString,
} from "class-validator";

@InputType()
export class UpdateStudentDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  lastName: string;

  @IsNotEmpty()
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
  password: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  confirm_password: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field()
  is_active: boolean;

  @IsNotEmpty()
  @IsString()
  @Field()
  gender: string;

  @IsNotEmpty()
  @IsDate()
  @Field()
  dateOfBirth: Date;

  @Field()
  @IsNotEmpty()
  @IsString()
  avatar_url: string;
}
