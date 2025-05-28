import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherGroupsService } from './teacher-groups.service';
import { CreateTeacherGroupDto } from './dto/create-teacher-group.dto';
import { UpdateTeacherGroupDto } from './dto/update-teacher-group.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TeacherGroup } from './entities/teacher-group.entity';

@Resolver(() => TeacherGroup)
export class TeacherGroupsResolver {
  constructor(private readonly teacherGroupsService: TeacherGroupsService) {}

  @Mutation(() => TeacherGroup)
  createTeacherGroup(
    @Args("createGroup") createTeacherGroupDto: CreateTeacherGroupDto
  ) {
    return this.teacherGroupsService.create(createTeacherGroupDto);
  }

  @Query(() => [TeacherGroup])
  findAllTeacherGroups() {
    return this.teacherGroupsService.findAll();
  }

  @Query(()=>TeacherGroup)
  findOneTeacherGroup(@Args("id") id: number) {
    return this.teacherGroupsService.findOne(+id);
  }

  @Mutation(()=>TeacherGroup)
  updateTeacherGroup(
    @Args("id") id: number,
    @Args("updateTeacherGroup") updateTeacherGroupDto: UpdateTeacherGroupDto
  ) {
    return this.teacherGroupsService.update(+id, updateTeacherGroupDto);
  }

  @Mutation(()=>Number)
  removeTeacherGroup(@Args("id") id: number) {
    return this.teacherGroupsService.remove(+id);
  }
}
