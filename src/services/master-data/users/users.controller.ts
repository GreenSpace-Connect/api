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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/lib/entities/response.entity';
import { UserEntity } from './entities/user.entity';
import { QueryUserDto } from './dto/query-user.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/users',
  version: ['1.0.0'],
})
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'created',
      data: new UserEntity(user),
    });
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() queryDto: QueryUserDto) {
    const users = await this.usersService.findAll(queryDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      items: users.data.map((user) => new UserEntity(user)),
      meta: users.meta,
    });
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);

    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new UserEntity(user),
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new UserEntity(user),
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(+id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new UserEntity(user),
    });
  }
}
