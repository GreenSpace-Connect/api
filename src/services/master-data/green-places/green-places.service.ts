import { Injectable } from '@nestjs/common';
import { CreateGreenPlaceDto } from './dto/create-green-place.dto';
import { UpdateGreenPlaceDto } from './dto/update-green-place.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryGreenPlaceDto } from './dto/query-green-place.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class GreenPlacesService {
  constructor(private prisma: PrismaService) {}

  async create(createGreenPlaceDto: CreateGreenPlaceDto) {
    const greenPlace = await this.prisma.greenPlace.create({
      data: createGreenPlaceDto,
    });

    return greenPlace;
  }

  async findAll(queryDto: QueryGreenPlaceDto) {
    // Query conditions
    const where: Prisma.GreenPlaceWhereInput = {};
    if (queryDto.search) {
      where.OR = [{ name: { contains: queryDto.search, mode: 'insensitive' } }];
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const greenPlaces = await paginate(this.prisma.greenPlace, {
      where,
      orderBy: queryDto.getOrderBy,
    });

    return greenPlaces;
  }

  async findOne(id: number) {
    const greenPlace = await this.prisma.greenPlace.findUnique({
      where: { id },
    });

    return greenPlace;
  }

  async update(id: number, updateGreenPlaceDto: UpdateGreenPlaceDto) {
    const greenPlace = await this.prisma.greenPlace.update({
      where: { id },
      data: updateGreenPlaceDto,
    });

    return greenPlace;
  }

  async remove(id: number) {
    const greenPlace = await this.prisma.greenPlace.delete({ where: { id } });

    return greenPlace;
  }
}
