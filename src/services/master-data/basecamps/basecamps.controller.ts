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
import { BasecampsService } from './basecamps.service';
import { CreateBasecampDto } from './dto/create-basecamp.dto';
import { UpdateBasecampDto } from './dto/update-basecamp.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/lib/entities/response.entity';
import { BasecampEntity } from './entities/basecamp.entity';
import { QueryBasecampDto } from './dto/query-basecamp.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/basecamps',
  version: ['1.0.0'],
})
@ApiTags('basecamps')
@Controller('basecamps')
export class BasecampsController {
  constructor(private readonly basecampsService: BasecampsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBasecampDto: CreateBasecampDto) {
    const basecamp = await this.basecampsService.create(createBasecampDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'created',
      data: new BasecampEntity(basecamp),
    });
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() queryDto: QueryBasecampDto) {
    const basecamps = await this.basecampsService.findAll(queryDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      items: basecamps.data.map((basecamp) => new BasecampEntity(basecamp)),
      meta: basecamps.meta,
    });
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const basecamp = await this.basecampsService.findOne(+id);

    if (!basecamp) {
      throw new NotFoundException(`Basecamp with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new BasecampEntity(basecamp),
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateBasecampDto: UpdateBasecampDto,
  ) {
    const basecamp = await this.basecampsService.update(+id, updateBasecampDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new BasecampEntity(basecamp),
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const basecamp = await this.basecampsService.remove(+id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new BasecampEntity(basecamp),
    });
  }
}
