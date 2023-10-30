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
import { GreenPlacesService } from './green-places.service';
import { CreateGreenPlaceDto } from './dto/create-green-place.dto';
import { UpdateGreenPlaceDto } from './dto/update-green-place.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/utils/entities/response.entity';
import { GreenPlaceEntity } from './entities/green-place.entity';
import { QueryGreenPlaceDto } from './dto/query-green-place.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/green-places',
  version: ['1.0.0'],
})
@ApiTags('greenPlaces')
@Controller('greenPlaces')
export class GreenPlacesController {
  constructor(private readonly greenPlacesService: GreenPlacesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createGreenPlaceDto: CreateGreenPlaceDto) {
    const greenPlace = await this.greenPlacesService.create(
      createGreenPlaceDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'created',
      data: new GreenPlaceEntity(greenPlace),
    });
  }

  @Get()
  async findAll(@Query() queryDto: QueryGreenPlaceDto) {
    const greenPlaces = await this.greenPlacesService.findAll(queryDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      items: greenPlaces.data.map(
        (greenPlace) => new GreenPlaceEntity(greenPlace),
      ),
      meta: greenPlaces.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const greenPlace = await this.greenPlacesService.findOne(+id);

    if (!greenPlace) {
      throw new NotFoundException(`GreenPlace with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new GreenPlaceEntity(greenPlace),
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateGreenPlaceDto: UpdateGreenPlaceDto,
  ) {
    const greenPlace = await this.greenPlacesService.update(
      +id,
      updateGreenPlaceDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new GreenPlaceEntity(greenPlace),
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const greenPlace = await this.greenPlacesService.remove(+id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new GreenPlaceEntity(greenPlace),
    });
  }
}
