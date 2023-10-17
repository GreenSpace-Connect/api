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
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/utils/entities/response.entity';
import { ProvinceEntity } from './entities/province.entity';
import { QueryProvinceDto } from './dto/query-province.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/regions/provinces',
  version: ['1.0.0'],
})
@ApiTags('provinces')
@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProvinceDto: CreateProvinceDto) {
    const province = await this.provincesService.create(createProvinceDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'created',
      data: new ProvinceEntity(province),
    });
  }

  @Get()
  async findAll(@Query() queryDto: QueryProvinceDto) {
    const provinces = await this.provincesService.findAll(queryDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      items: provinces.data.map((province) => new ProvinceEntity(province)),
      meta: provinces.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const province = await this.provincesService.findOne(+id);

    if (!province) {
      throw new NotFoundException(`Province with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new ProvinceEntity(province),
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ) {
    const province = await this.provincesService.update(+id, updateProvinceDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new ProvinceEntity(province),
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const province = await this.provincesService.remove(+id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new ProvinceEntity(province),
    });
  }
}
