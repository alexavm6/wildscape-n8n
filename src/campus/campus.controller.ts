import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CampusService } from './campus.service';
import { PaginationDto } from '@common/dto/pagination.dto';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { PaginationManagementCampusDto } from './dto/pagination-management-campus.dto';
import { ParseMongoIdPipe } from '@common/pipes/parse-mongo-id.pipe';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management-filter')
  async findAllManagementFilter(@Query('name') name?: string) {
    const data = await this.campusService.findAllManagementFilter(name);
    return {
      statusCode: 200,
      message: 'Filtro administrativo aplicado correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management')
  async findAllManagement(
    @Query() paginationManagementCampusDto: PaginationManagementCampusDto,
  ) {
    const data = await this.campusService.findAllManagement(
      paginationManagementCampusDto,
    );
    return {
      statusCode: 200,
      message: 'Campus administrativos listados correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management/:id')
  async findByIdManagement(@Param('id', ParseMongoIdPipe) id: string) {
    const data = await this.campusService.findByIdManagement(id);
    return {
      statusCode: 200,
      message: 'Campus administrativo obtenido correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCampusDto: UpdateCampusDto,
  ) {
    const data = await this.campusService.updateById(id, updateCampusDto);
    return {
      statusCode: 200,
      message: 'Campus actualizado correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCampusDto: CreateCampusDto) {
    const data = await this.campusService.create(createCampusDto);
    return {
      statusCode: 200,
      message: 'Campus creado correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseMongoIdPipe) id: string) {
    const data = await this.campusService.delete(id);
    return {
      statusCode: 200,
      message: 'Campus eliminado correctamente',
      data,
    };
  }
}
