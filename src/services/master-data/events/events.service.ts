import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryEventDto } from './dto/query-event.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const event = await this.prisma.event.create({
      data: createEventDto,
    });

    return event;
  }

  async findAll(queryDto: QueryEventDto) {
    // Query conditions
    const where: Prisma.EventWhereInput = {};
    if (queryDto.search) {
      where.OR = [{ name: { contains: queryDto.search, mode: 'insensitive' } }];
    }
    if (queryDto.communityId) {
      where.communityId = queryDto.communityId;
    }
    if (queryDto.provinceId) {
      where.provinceId = queryDto.provinceId;
    }
    if (queryDto.cityId) {
      where.cityId = queryDto.cityId;
    }
    if (queryDto.districtId) {
      where.districtId = queryDto.districtId;
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const events = await paginate(this.prisma.event, {
      where,
      orderBy: queryDto.getOrderBy,
      include: {
        province: true,
        city: true,
        district: true,
        community: true,
      },
    });

    return events;
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        province: true,
        city: true,
        district: true,
        community: true,
      },
    });

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });

    return event;
  }

  async remove(id: number) {
    const event = await this.prisma.event.delete({ where: { id } });

    return event;
  }
}
