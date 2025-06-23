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
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationManagementDto } from '@common/dto/management/pagination-management.dto';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { ParseMongoIdPipe } from '@common/pipes/parse-mongo-id.pipe';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  /* ──────────── Usuarios ──────────── */
  @Get('filter')
  async findAllProductFilter() {
    const data = await this.cityService.findAllProductFilter();
    return {
      statusCode: 200,
      message: 'Filtro de ciudades obtenido correctamente',
      data,
    };
  }

  /* ──────────── Administrador ──────────── */
  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management-filter')
  async findAllManagementFilter(@Query('name') name?: string) {
    const data = await this.cityService.findAllManagementFilter(name);
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
    @Query() paginationManagementDto: PaginationManagementDto,
  ) {
    const data = await this.cityService.findAllManagement(paginationManagementDto);
    return {
      statusCode: 200,
      message: 'Ciudades administrativas listadas correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management/:id')
  async findByIdManagement(@Param('id', ParseMongoIdPipe) id: string) {
    const data = await this.cityService.findByIdManagement(id);
    return {
      statusCode: 200,
      message: 'Ciudad administrativa obtenida correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCityDto: UpdateCityDto,
  ) {
    const data = await this.cityService.updateById(id, updateCityDto);
    return {
      statusCode: 200,
      message: 'Ciudad actualizada correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCityDto: CreateCityDto) {
    const data = await this.cityService.create(createCityDto);
    return {
      statusCode: 200,
      message: 'Ciudad creada correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseMongoIdPipe) id: string) {
    const data = await this.cityService.delete(id);
    return {
      statusCode: 200,
      message: 'Ciudad eliminada correctamente',
      data,
    };
  }
}
