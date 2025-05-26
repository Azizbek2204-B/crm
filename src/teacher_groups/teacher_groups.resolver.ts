import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TeacherGroupsService } from "./teacher_groups.service";
import { CreateTeacherGroupDto } from "./dto/create-teacher_group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher_group.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TeacherGroup } from "./entities/teacher_group.entity";

@Resolver()
export class TeacherGroupsResolver {
  constructor(private readonly teacherGroupsService: TeacherGroupsService) {}

  @Query(() => [TeacherGroup])
  findAllTeacherGroups() {
    return this.teacherGroupsService.findAll();
  }

  @Query(() => TeacherGroup)
  findOneTeacherGroup(@Args("id") id: number) {
    return this.teacherGroupsService.findOne(id);
  }

  @Mutation()
  createTeacherGroup(
    @Args("createTeacherGroup") createTeacherGroupDto: CreateTeacherGroupDto
  ) {
    return this.teacherGroupsService.create(createTeacherGroupDto);
  }

  @Mutation(() => TeacherGroup)
  updateTeacherGroup(
    @Args("id") id: number,
    @Args("updateTeacherGroup") updateTeacherGroupDto: UpdateTeacherGroupDto
  ) {
    return this.teacherGroupsService.update(id, updateTeacherGroupDto);
  }

  @Mutation(() => Number)
  removeTeacherGroup(@Args("id", { type: () => ID }) id: number) {
    return this.teacherGroupsService.remove(id);
  }
}
