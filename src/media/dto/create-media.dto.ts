import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMediaDto {
 @IsNotEmpty()
 @IsInt()
  homeworkId:number

  @IsNotEmpty()
  @IsString()
  files: string;
   
  @IsString()
  @IsNotEmpty()
  type: string;

   @IsNotEmpty()
   @IsString()
   filename: string;

   @IsNotEmpty()
   @IsNumber()
  size: number;
}
