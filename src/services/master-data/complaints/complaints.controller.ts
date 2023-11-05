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
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/utils/entities/response.entity';
import { ComplaintEntity } from './entities/complaint.entity';
import { QueryComplaintDto } from './dto/query-complaint.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/complaints',
  version: ['1.0.0'],
})
@ApiTags('complaints')
@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createComplaintDto: CreateComplaintDto) {
    const complaint = await this.complaintsService.create(createComplaintDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'created',
      data: new ComplaintEntity(complaint),
    });
  }

  @Get()
  async findAll(@Query() queryDto: QueryComplaintDto) {
    const complaints = await this.complaintsService.findAll(queryDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      items: complaints.data.map((complaint) => new ComplaintEntity(complaint)),
      meta: complaints.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const complaint = await this.complaintsService.findOne(+id);

    if (!complaint) {
      throw new NotFoundException(`Complaint with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new ComplaintEntity(complaint),
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateComplaintDto: UpdateComplaintDto,
  ) {
    const complaint = await this.complaintsService.update(
      +id,
      updateComplaintDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new ComplaintEntity(complaint),
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const complaint = await this.complaintsService.remove(+id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new ComplaintEntity(complaint),
    });
  }
}
