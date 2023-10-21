import { Injectable } from '@nestjs/common';
import { CreateDonationTransactionDto } from './dto/create-donation-transaction.dto';
import { UpdateDonationTransactionDto } from './dto/update-donation-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryDonationTransactionDto } from './dto/query-donation-transaction.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class DonationTransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(createDonationTransactionDto: CreateDonationTransactionDto) {
    const donationTransaction = await this.prisma.donationTransaction.create({
      data: createDonationTransactionDto,
    });

    return donationTransaction;
  }

  async findAll(queryDto: QueryDonationTransactionDto) {
    // Query conditions
    const where: Prisma.DonationTransactionWhereInput = {};
    if (queryDto.userId) {
      where.userId = queryDto.userId;
    }
    if (queryDto.donationId) {
      where.donationId = queryDto.donationId;
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const donationTransactions = await paginate(
      this.prisma.donationTransaction,
      {
        where,
        orderBy: queryDto.getOrderBy,
        include: {
          donation: true,
          user: true,
        },
      },
    );

    return donationTransactions;
  }

  async findOne(id: number) {
    const donationTransaction =
      await this.prisma.donationTransaction.findUnique({
        where: { id },
        include: {
          donation: true,
          user: true,
        },
      });

    return donationTransaction;
  }

  async update(
    id: number,
    updateDonationTransactionDto: UpdateDonationTransactionDto,
  ) {
    const donationTransaction = await this.prisma.donationTransaction.update({
      where: { id },
      data: updateDonationTransactionDto,
    });

    return donationTransaction;
  }

  async remove(id: number) {
    const donationTransaction = await this.prisma.donationTransaction.delete({
      where: { id },
    });

    return donationTransaction;
  }
}
