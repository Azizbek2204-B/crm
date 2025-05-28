import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Group } from './entities/group.entity';

@Resolver(()=>Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Mutation(()=>Group)
  createGroup(@Args("createGroup") createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Query(()=>[Group])
  findAllGroup() {
    return this.groupService.findAll();
  }

  @Query(()=>Group)
  findOneGroup(@Args('id') id: number) {
    return this.groupService.findOne(+id);
  }

  @Mutation(()=>Group)
  updateGroup(@Args('id') id: number, @Args("updateGroup") updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Mutation(()=>Number)
  removeGroup(@Args('id') id: number) {
    return this.groupService.remove(+id);
  }
}
