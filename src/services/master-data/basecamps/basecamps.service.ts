import { Injectable } from '@nestjs/common';
import { CreateBasecampDto } from './dto/create-basecamp.dto';
import { UpdateBasecampDto } from './dto/update-basecamp.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryBasecampDto } from './dto/query-basecamp.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BasecampsService {
  constructor(private prisma: PrismaService) {}

  async create(createBasecampDto: CreateBasecampDto) {
    const basecamp = await this.prisma.basecamp.create({
      data: createBasecampDto,
    });

    return basecamp;
  }

  async findAll(queryDto: QueryBasecampDto) {
    // Query conditions
    const where: Prisma.BasecampWhereInput = {};
    if (queryDto.search) {
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const basecamps = await paginate(this.prisma.basecamp, {
      where,
      orderBy: queryDto.getOrderBy,
      include: {
        community: true,
        greenPlace: true,
      },
    });

    return basecamps;
  }

  async findOne(id: number) {
    const basecamp = await this.prisma.basecamp.findUnique({
      where: { id },
      include: {
        community: {
          include: {
            pic: true,
          },
        },
        greenPlace: true,
      },
    });

    return basecamp;
  }

  async update(id: number, updateBasecampDto: UpdateBasecampDto) {
    const basecamp = await this.prisma.basecamp.update({
      where: { id },
      data: updateBasecampDto,
    });

    return basecamp;
  }

  async remove(id: number) {
    const basecamp = await this.prisma.basecamp.delete({ where: { id } });

    return basecamp;
  }
}
