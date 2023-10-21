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
import { TicketTransactionsService } from './ticket-transactions.service';
import { CreateTicketTransactionDto } from './dto/create-ticket-transaction.dto';
import { UpdateTicketTransactionDto } from './dto/update-ticket-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/utils/entities/response.entity';
import { TicketTransactionEntity } from './entities/ticket-transaction.entity';
import { QueryTicketTransactionDto } from './dto/query-ticket-transaction.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/ticket-transactions',
  version: ['1.0.0'],
})
@ApiTags('ticket-transactions')
@Controller('ticket-transactions')
export class TicketTransactionsController {
  constructor(
    private readonly ticketTransactionsService: TicketTransactionsService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTicketTransactionDto: CreateTicketTransactionDto) {
    const ticketTransaction = await this.ticketTransactionsService.create(
      createTicketTransactionDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'created',
      data: new TicketTransactionEntity(ticketTransaction),
    });
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() queryDto: QueryTicketTransactionDto) {
    const ticketTransactions = await this.ticketTransactionsService.findAll(
      queryDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      items: ticketTransactions.data.map(
        (ticketTransaction) => new TicketTransactionEntity(ticketTransaction),
      ),
      meta: ticketTransactions.meta,
    });
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const ticketTransaction = await this.ticketTransactionsService.findOne(+id);

    if (!ticketTransaction) {
      throw new NotFoundException(
        `TicketTransaction with ${id} does not exist.`,
      );
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new TicketTransactionEntity(ticketTransaction),
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTicketTransactionDto: UpdateTicketTransactionDto,
  ) {
    const ticketTransaction = await this.ticketTransactionsService.update(
      +id,
      updateTicketTransactionDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new TicketTransactionEntity(ticketTransaction),
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const ticketTransaction = await this.ticketTransactionsService.remove(+id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new TicketTransactionEntity(ticketTransaction),
    });
  }
}
