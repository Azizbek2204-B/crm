import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class UpdateGradeDto {
  @IsNotEmpty()
  @IsInt()
  studentId: number;
  @IsNotEmpty()
  @IsInt()
  hsubmissionId: number;
  @IsNotEmpty()
  @IsInt()
  teacheId: number;
  @IsInt()
  @IsNotEmpty()
  grade: number;
  @IsDateString()
  @IsNotEmpty()
  date: Date;
  @IsNotEmpty()
  @IsString()
  comment: string;
}
