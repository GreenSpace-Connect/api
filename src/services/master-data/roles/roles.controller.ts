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
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/lib/entities/response.entity';
import { RoleEntity } from './entities/role.entity';
import { QueryRoleDto } from './dto/query-tole.dto';

@Controller({
  path: 'master-data/roles',
  version: ['1.0.0'],
})
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.rolesService.create(createRoleDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'created',
      data: new RoleEntity(role),
    });
  }

  @Get()
  async findAll(@Query() queryDto: QueryRoleDto) {
    const roles = await this.rolesService.findAll(queryDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      items: roles.data.map((role) => new RoleEntity(role)),
      meta: roles.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role = await this.rolesService.findOne(+id);

    if (!role) {
      throw new NotFoundException(`Role with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new RoleEntity(role),
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesService.update(+id, updateRoleDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new RoleEntity(role),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const role = await this.rolesService.remove(+id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new RoleEntity(role),
    });
  }
}
