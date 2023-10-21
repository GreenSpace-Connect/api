import { Injectable } from '@nestjs/common';
import { CreateTicketTransactionDto } from './dto/create-ticket-transaction.dto';
import { UpdateTicketTransactionDto } from './dto/update-ticket-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryTicketTransactionDto } from './dto/query-ticket-transaction.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TicketTransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(createTicketTransactionDto: CreateTicketTransactionDto) {
    const ticketTransaction = await this.prisma.ticketTransaction.create({
      data: createTicketTransactionDto,
    });

    return ticketTransaction;
  }

  async findAll(queryDto: QueryTicketTransactionDto) {
    // Query conditions
    const where: Prisma.TicketTransactionWhereInput = {};
    if (queryDto.userId) {
      where.userId = queryDto.userId;
    }
    if (queryDto.ticketId) {
      where.ticketId = queryDto.ticketId;
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const ticketTransactions = await paginate(this.prisma.ticketTransaction, {
      where,
      orderBy: queryDto.getOrderBy,
      include: {
        ticket: true,
        user: true,
      },
    });

    return ticketTransactions;
  }

  async findOne(id: number) {
    const ticketTransaction = await this.prisma.ticketTransaction.findUnique({
      where: { id },
      include: {
        ticket: true,
        user: true,
      },
    });

    return ticketTransaction;
  }

  async update(
    id: number,
    updateTicketTransactionDto: UpdateTicketTransactionDto,
  ) {
    const ticketTransaction = await this.prisma.ticketTransaction.update({
      where: { id },
      data: updateTicketTransactionDto,
    });

    return ticketTransaction;
  }

  async remove(id: number) {
    const ticketTransaction = await this.prisma.ticketTransaction.delete({
      where: { id },
    });

    return ticketTransaction;
  }
}
