import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/lib/entities/response.entity';
import { TicketEntity } from './entities/ticket.entity';
import { QueryTicketDto } from './dto/query-ticket.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/tickets',
  version: ['1.0.0'],
})
@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTicketDto: CreateTicketDto) {
    const ticket = await this.ticketsService.create(createTicketDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'created',
      data: new TicketEntity(ticket),
    });
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() queryDto: QueryTicketDto) {
    const tickets = await this.ticketsService.findAll(queryDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      items: tickets.data.map((ticket) => new TicketEntity(ticket)),
      meta: tickets.meta,
    });
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const ticket = await this.ticketsService.findOne(+id);

    if (!ticket) {
      throw new NotFoundException(`Ticket with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new TicketEntity(ticket),
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    const ticket = await this.ticketsService.update(+id, updateTicketDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new TicketEntity(ticket),
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const ticket = await this.ticketsService.remove(+id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new TicketEntity(ticket),
    });
  }
}
