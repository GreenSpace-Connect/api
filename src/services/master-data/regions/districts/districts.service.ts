import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryDistrictDto } from './dto/query-district.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class DistrictsService {
  constructor(private prisma: PrismaService) {}

  async create(createDistrictDto: CreateDistrictDto) {
    const district = await this.prisma.district.create({
      data: createDistrictDto,
    });

    return district;
  }

  async findAll(queryDto: QueryDistrictDto) {
    // Query conditions
    const where: Prisma.DistrictWhereInput = {};
    if (queryDto.search) {
      where.OR = [{ name: { contains: queryDto.search, mode: 'insensitive' } }];
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const districts = await paginate(this.prisma.district, {
      where,
      orderBy: queryDto.getOrderBy,
    });

    return districts;
  }

  async findOne(id: number) {
    const district = await this.prisma.district.findUnique({
      where: { id },
    });

    return district;
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await this.prisma.district.update({
      where: { id },
      data: updateDistrictDto,
    });

    return district;
  }

  async remove(id: number) {
    const district = await this.prisma.district.delete({ where: { id } });

    return district;
  }
}
