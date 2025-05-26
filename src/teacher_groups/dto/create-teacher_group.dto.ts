import { Group } from "../../groups/entities/group.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";

export class CreateTeacherGroupDto {
  teacherId: Teacher;
  groupId: Group;
}
