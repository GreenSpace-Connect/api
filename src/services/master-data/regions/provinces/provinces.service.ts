import { Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryProvinceDto } from './dto/query-province.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProvincesService {
  constructor(private prisma: PrismaService) {}

  async create(createProvinceDto: CreateProvinceDto) {
    const province = await this.prisma.province.create({
      data: createProvinceDto,
    });

    return province;
  }

  async findAll(queryDto: QueryProvinceDto) {
    // Query conditions
    const where: Prisma.ProvinceWhereInput = {};
    if (queryDto.search) {
      where.OR = [{ name: { contains: queryDto.search, mode: 'insensitive' } }];
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const provinces = await paginate(this.prisma.province, {
      where,
      orderBy: queryDto.getOrderBy,
    });

    return provinces;
  }

  async findOne(id: number) {
    const province = await this.prisma.province.findUnique({
      where: { id },
    });

    return province;
  }

  async update(id: number, updateProvinceDto: UpdateProvinceDto) {
    const province = await this.prisma.province.update({
      where: { id },
      data: updateProvinceDto,
    });

    return province;
  }

  async remove(id: number) {
    const province = await this.prisma.province.delete({ where: { id } });

    return province;
  }
}
