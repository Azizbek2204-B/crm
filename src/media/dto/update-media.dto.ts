import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateMediaDto {
  @IsNotEmpty()
  @IsInt()
  homeworkId: number;

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
