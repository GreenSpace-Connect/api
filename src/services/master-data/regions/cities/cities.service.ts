import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryCityDto } from './dto/query-city.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createCityDto: CreateCityDto) {
    const city = await this.prisma.city.create({
      data: createCityDto,
    });

    return city;
  }

  async findAll(queryDto: QueryCityDto) {
    // Query conditions
    const where: Prisma.CityWhereInput = {};
    if (queryDto.search) {
      where.OR = [{ name: { contains: queryDto.search, mode: 'insensitive' } }];
    }
    if (queryDto.provinceId) {
      where.provinceId = queryDto.provinceId;
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const cities = await paginate(this.prisma.city, {
      where,
      orderBy: queryDto.getOrderBy,
      include: {
        province: true,
      },
    });

    return cities;
  }

  async findOne(id: number) {
    const city = await this.prisma.city.findUnique({
      where: { id },
      include: {
        province: true,
      },
    });

    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.prisma.city.update({
      where: { id },
      data: updateCityDto,
    });

    return city;
  }

  async remove(id: number) {
    const city = await this.prisma.city.delete({ where: { id } });

    return city;
  }
}
