import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherGroupDto } from './create-teacher_group.dto';

export class UpdateTeacherGroupDto extends PartialType(CreateTeacherGroupDto) {}
