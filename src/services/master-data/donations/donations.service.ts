import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryDonationDto } from './dto/query-donation.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) {}

  async create(createDonationDto: CreateDonationDto) {
    const donation = await this.prisma.donation.create({
      data: createDonationDto,
    });

    return donation;
  }

  async findAll(queryDto: QueryDonationDto) {
    // Query conditions
    const where: Prisma.DonationWhereInput = {};
    if (queryDto.search) {
      where.OR = [{ name: { contains: queryDto.search, mode: 'insensitive' } }];
    }
    if (queryDto.eventId) {
      where.eventId = queryDto.eventId;
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const donations = await paginate(this.prisma.donation, {
      where,
      orderBy: queryDto.getOrderBy,
      include: {
        event: true,
        donationTransaction: true,
      },
    });

    return donations;
  }

  async findOne(id: number) {
    const donation = await this.prisma.donation.findUnique({
      where: { id },
      include: {
        event: true,
        donationTransaction: true,
      },
    });

    return donation;
  }

  async update(id: number, updateDonationDto: UpdateDonationDto) {
    const donation = await this.prisma.donation.update({
      where: { id },
      data: updateDonationDto,
    });

    return donation;
  }

  async remove(id: number) {
    const donation = await this.prisma.donation.delete({ where: { id } });

    return donation;
  }
}
