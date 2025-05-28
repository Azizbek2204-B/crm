import {
  IsDateString,
  IsInt,
  isInt,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class UpdateHomeworkDto {
  @IsNotEmpty()
  @IsInt()
  teacherId: number;

  @IsNotEmpty()
  @IsInt()
  groupId: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  deadline: Date;

  @IsNotEmpty()
  @IsString()
  file_url: string;
}
