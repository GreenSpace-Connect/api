import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryCommunityDto } from './dto/query-community.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommunitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createCommunityDto: CreateCommunityDto) {
    const community = await this.prisma.community.create({
      data: createCommunityDto,
    });

    return community;
  }

  async findAll(queryDto: QueryCommunityDto) {
    // Query conditions
    const where: Prisma.CommunityWhereInput = {};
    if (queryDto.search) {
      where.OR = [{ name: { contains: queryDto.search, mode: 'insensitive' } }];
    }
    if (queryDto.picId) {
      where.picId = queryDto.picId;
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const communities = await paginate(this.prisma.community, {
      where,
      orderBy: queryDto.getOrderBy,
      include: {
        pic: true,
      },
    });

    return communities;
  }

  async findOne(id: number) {
    const community = await this.prisma.community.findUnique({
      where: { id },
      include: {
        pic: true,
      },
    });

    return community;
  }

  async update(id: number, updateCommunityDto: UpdateCommunityDto) {
    const community = await this.prisma.community.update({
      where: { id },
      data: updateCommunityDto,
    });

    return community;
  }

  async remove(id: number) {
    const community = await this.prisma.community.delete({ where: { id } });

    return community;
  }
}
