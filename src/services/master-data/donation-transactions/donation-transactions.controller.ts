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
import { DonationTransactionsService } from './donation-transactions.service';
import { CreateDonationTransactionDto } from './dto/create-donation-transaction.dto';
import { UpdateDonationTransactionDto } from './dto/update-donation-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/utils/entities/response.entity';
import { DonationTransactionEntity } from './entities/donation-transaction.entity';
import { QueryDonationTransactionDto } from './dto/query-donation-transaction.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/donation-transactions',
  version: ['1.0.0'],
})
@ApiTags('donation-transactions')
@Controller('donation-transactions')
export class DonationTransactionsController {
  constructor(
    private readonly donationTransactionsService: DonationTransactionsService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createDonationTransactionDto: CreateDonationTransactionDto,
  ) {
    const donationTransaction = await this.donationTransactionsService.create(
      createDonationTransactionDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'created',
      data: new DonationTransactionEntity(donationTransaction),
    });
  }

  @Get()
  async findAll(@Query() queryDto: QueryDonationTransactionDto) {
    const donationTransactions = await this.donationTransactionsService.findAll(
      queryDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      items: donationTransactions.data.map(
        (donationTransaction) =>
          new DonationTransactionEntity(donationTransaction),
      ),
      meta: donationTransactions.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const donationTransaction = await this.donationTransactionsService.findOne(
      +id,
    );

    if (!donationTransaction) {
      throw new NotFoundException(
        `DonationTransaction with ${id} does not exist.`,
      );
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new DonationTransactionEntity(donationTransaction),
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateDonationTransactionDto: UpdateDonationTransactionDto,
  ) {
    const donationTransaction = await this.donationTransactionsService.update(
      +id,
      updateDonationTransactionDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new DonationTransactionEntity(donationTransaction),
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const donationTransaction = await this.donationTransactionsService.remove(
      +id,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new DonationTransactionEntity(donationTransaction),
    });
  }
}
