import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { QueryCommentDto } from './dto/query-comment.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = await this.prisma.comment.create({
      data: createCommentDto,
    });

    return comment;
  }

  async findAll(queryDto: QueryCommentDto) {
    // Query conditions
    const where: Prisma.CommentWhereInput = {};
    if (queryDto.search) {
    }

    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    const comments = await paginate(this.prisma.comment, {
      where,
      orderBy: queryDto.getOrderBy,
    });

    return comments;
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });

    return comment;
  }

  async remove(id: number) {
    const comment = await this.prisma.comment.delete({ where: { id } });

    return comment;
  }
}
