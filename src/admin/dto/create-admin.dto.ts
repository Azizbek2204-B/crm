import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

@InputType()
export class CreateAdminDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty()
  @IsPhoneNumber("UZ")
  phone: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}


