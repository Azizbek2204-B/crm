import {Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Teacher } from './entities/teacher.entity';

@Resolver("teacher")
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Mutation(() => Teacher)
  createTeacher(@Args("createUser") createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Query(() => [Teacher])
  findAllTeacher() {
    return this.teacherService.findAll();
  }

  @Query(() => Teacher)
  findOneTeacher(@Args("id") id: number) {
    return this.teacherService.findOne(+id);
  }

  @Mutation(() => Teacher)
  updateTeacher(
    @Args("id", { type: () => ID}) id: number,
    @Args("updateTeacher") updateTeacherDto: UpdateTeacherDto
  ) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Mutation(()=>Number)
  removeTeacher(@Args("id",{type:()=> ID}) id: number) {
    return this.teacherService.remove(+id);
  }
}
