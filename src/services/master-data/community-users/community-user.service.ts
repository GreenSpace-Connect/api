import { Injectable } from '@nestjs/common';
import { CreateCommunityUserDto } from './dto/create-community-user.dto';
import { UpdateCommunityUserDto } from './dto/update-community-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryCommunityUserDto } from './dto/query-community-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommunityUserService {
  constructor(private prisma: PrismaService) {}

  async create(createCommunityUserDto: CreateCommunityUserDto) {
    const communityUser = await this.prisma.communityUser.create({
      data: createCommunityUserDto,
    });

    return communityUser;
  }

  async findAll(queryDto: QueryCommunityUserDto) {
    // Query conditions
    const where: Prisma.CommunityUserWhereInput = {};
    if (queryDto.userId) {
      where.userId = queryDto.userId;
    }
    if (queryDto.communityId) {
      where.communityId = queryDto.communityId;
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const communityUsers = await paginate(this.prisma.communityUser, {
      where,
      orderBy: queryDto.getOrderBy,
      include: {
        community: true,
        user: true,
      },
    });

    return communityUsers;
  }

  async findOne(id: number) {
    const communityUser = await this.prisma.communityUser.findUnique({
      where: { id },
      include: {
        community: true,
        user: true,
      },
    });

    return communityUser;
  }

  async update(id: number, updateCommunityUserDto: UpdateCommunityUserDto) {
    const communityUser = await this.prisma.communityUser.update({
      where: { id },
      data: updateCommunityUserDto,
    });

    return communityUser;
  }

  async remove(id: number) {
    const communityUser = await this.prisma.communityUser.delete({
      where: { id },
    });

    return communityUser;
  }
}
