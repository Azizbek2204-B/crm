import { IsDate, IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateHomeworkSubmissionDto {
  @IsNotEmpty()
  @IsInt()
  homeworkId: number;

  @IsNotEmpty()
  @IsInt()
  studentId: number;

  @IsNotEmpty()
  @IsString()
  fileUrl: string;

  @IsNotEmpty()
  @IsDateString()
  submittedAt: Date;


  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
