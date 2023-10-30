import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryUserDto } from './dto/query-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return user;
  }

  async findAll(queryDto: QueryUserDto) {
    // Query conditions
    const where: Prisma.UserWhereInput = {};
    if (queryDto.search) {
      where.OR = [
        { fullname: { contains: queryDto.search, mode: 'insensitive' } },
        { email: { contains: queryDto.search, mode: 'insensitive' } },
      ];
    }
    if (queryDto.roleId) {
      where.roleId = queryDto.roleId;
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const users = await paginate(this.prisma.user, {
      where,
      orderBy: queryDto.getOrderBy,
      include: {
        role: true,
      },
    });

    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
        community: true,
      },
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({ where: { id } });

    return user;
  }
}
