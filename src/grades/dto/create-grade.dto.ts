import { IsDateString, IsIn, IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateGradeDto {
    @IsNotEmpty()
    @IsInt()
    studentId:number
    @IsNotEmpty()
    @IsInt()
    hsubmissionId:number
    @IsNotEmpty()
    @IsInt()
    teacherId:number
    @IsInt()
    @IsNotEmpty()
    grade:number
    @IsDateString()
    @IsNotEmpty()
    date:Date
    @IsNotEmpty()
    @IsString()
    comment:string
}

