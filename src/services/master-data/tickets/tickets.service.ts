import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryTicketDto } from './dto/query-ticket.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    const ticket = await this.prisma.ticket.create({
      data: createTicketDto,
    });

    return ticket;
  }

  async findAll(queryDto: QueryTicketDto) {
    // Query conditions
    const where: Prisma.TicketWhereInput = {};
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

    const tickets = await paginate(this.prisma.ticket, {
      where,
      orderBy: queryDto.getOrderBy,
    });

    return tickets;
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
    });

    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });

    return ticket;
  }

  async remove(id: number) {
    const ticket = await this.prisma.ticket.delete({ where: { id } });

    return ticket;
  }
}
