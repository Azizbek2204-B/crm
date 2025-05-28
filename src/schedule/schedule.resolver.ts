import {  Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schedule } from './entities/schedule.entity';

@Resolver(()=>Schedule)
export class ScheduleResolver{
  constructor(private readonly scheduleService: ScheduleService) {}

  @Mutation(()=>Schedule)
  createSchedule(@Args("createSchedule") createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Query(()=>[Schedule])
  findAllSchedule() {
    return this.scheduleService.findAll();
  }

  @Query(()=>Schedule)
  findOneSchedule(@Args('id') id: number) {
    return this.scheduleService.findOne(+id);
  }

  @Mutation(()=>Schedule)
  updateSchedule(@Args('id') id: number, @Args("updateSchedule") updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Mutation(()=>Number)
  removeSchedule(@Args('id') id: number) {
    return this.scheduleService.remove(+id);
  }
}
