import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Course } from './entities/course.entity';

@Resolver('course')
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(()=>Course)
  createCourse(@Args("createCourse") createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Query(()=>[Course])
  findAllCourse() {
    return this.courseService.findAll();
  }

  @Query(()=>Course)
  findOneCourse(@Args('id') id:number) {
    return this.courseService.findOne(+id);
  }

  @Mutation(()=>Course)
  updateCourse(@Args('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Mutation(()=>Number)
  removeCourse(@Args('id') id:number) {
    return this.courseService.remove(+id);
  }
}
