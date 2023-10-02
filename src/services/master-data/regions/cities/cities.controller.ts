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
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/lib/entities/response.entity';
import { CityEntity } from './entities/city.entity';
import { QueryCityDto } from './dto/query-city.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/regions/cities',
  version: ['1.0.0'],
})
@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCityDto: CreateCityDto) {
    const city = await this.citiesService.create(createCityDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'created',
      data: new CityEntity(city),
    });
  }

  @Get()
  async findAll(@Query() queryDto: QueryCityDto) {
    const cities = await this.citiesService.findAll(queryDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      items: cities.data.map((city) => new CityEntity(city)),
      meta: cities.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const city = await this.citiesService.findOne(+id);

    if (!city) {
      throw new NotFoundException(`City with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new CityEntity(city),
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    const city = await this.citiesService.update(+id, updateCityDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new CityEntity(city),
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const city = await this.citiesService.remove(+id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new CityEntity(city),
    });
  }
}
