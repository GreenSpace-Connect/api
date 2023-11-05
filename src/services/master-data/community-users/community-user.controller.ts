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
import { CommunityUserService } from './community-user.service';
import { CreateCommunityUserDto } from './dto/create-community-user.dto';
import { UpdateCommunityUserDto } from './dto/update-community-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/utils/entities/response.entity';
import { CommunityUserEntity } from './entities/community-user.entity';
import { QueryCommunityUserDto } from './dto/query-community-user.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/community-users',
  version: ['1.0.0'],
})
@ApiTags('communityUsers')
@Controller('communityUsers')
export class CommunityUserController {
  constructor(private readonly communityUsersService: CommunityUserService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCommunityUserDto: CreateCommunityUserDto) {
    const communityUser = await this.communityUsersService.create(
      createCommunityUserDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'created',
      data: new CommunityUserEntity(communityUser),
    });
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() queryDto: QueryCommunityUserDto) {
    const communityUsers = await this.communityUsersService.findAll(queryDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      items: communityUsers.data.map(
        (communityUser) => new CommunityUserEntity(communityUser),
      ),
      meta: communityUsers.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const communityUser = await this.communityUsersService.findOne(+id);

    if (!communityUser) {
      throw new NotFoundException(`CommunityUser with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new CommunityUserEntity(communityUser),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommunityUserDto: UpdateCommunityUserDto,
  ) {
    const communityUser = await this.communityUsersService.update(
      +id,
      updateCommunityUserDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new CommunityUserEntity(communityUser),
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const communityUser = await this.communityUsersService.remove(+id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new CommunityUserEntity(communityUser),
    });
  }
}
