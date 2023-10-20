import { Injectable } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryComplaintDto } from './dto/query-complaint.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ComplaintsService {
  constructor(private prisma: PrismaService) {}

  async create(createComplaintDto: CreateComplaintDto) {
    const complaint = await this.prisma.complaint.create({
      data: createComplaintDto,
    });

    return complaint;
  }

  async findAll(queryDto: QueryComplaintDto) {
    // Query conditions
    const where: Prisma.ComplaintWhereInput = {};
    if (queryDto.search) {
      where.OR = [
        { subject: { contains: queryDto.search, mode: 'insensitive' } },
        { description: { contains: queryDto.search, mode: 'insensitive' } },
      ];
    }
    if (queryDto.greenPlaceId) {
      where.greenPlaceId = queryDto.greenPlaceId;
    }
    if (queryDto.userId) {
      where.userId = queryDto.userId;
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const complaints = await paginate(this.prisma.complaint, {
      where,
      orderBy: queryDto.getOrderBy,
      include: {
        greenPlace: true,
        user: true,
      },
    });

    return complaints;
  }

  async findOne(id: number) {
    const complaint = await this.prisma.complaint.findUnique({
      where: { id },
      include: {
        greenPlace: true,
        user: true,
      },
    });

    return complaint;
  }

  async update(id: number, updateComplaintDto: UpdateComplaintDto) {
    const complaint = await this.prisma.complaint.update({
      where: { id },
      data: updateComplaintDto,
    });

    return complaint;
  }

  async remove(id: number) {
    const complaint = await this.prisma.complaint.delete({ where: { id } });

    return complaint;
  }
}
