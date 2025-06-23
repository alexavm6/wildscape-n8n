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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { PaginationManagementDto } from '@common/dto/management/pagination-management.dto';
import { ParseMongoIdPipe } from '@common/pipes/parse-mongo-id.pipe';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /* ──────── Usuarios ──────── */
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const data = await this.categoryService.findAll(paginationDto);
    return {
      statusCode: 200,
      message: 'Categorías listadas correctamente',
      data,
    };
  }

  @Get('filter')
  async findAllProductFilter() {
    const data = await this.categoryService.findAllProductFilter();
    return {
      statusCode: 200,
      message: 'Filtro de categorías obtenido correctamente',
      data,
    };
  }

  /* ──────── Administrador ──────── */
  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management-filter')
  async findAllManagementFilter(@Query('name') name?: string) {
    const data = await this.categoryService.findAllManagementFilter(name);
    return {
      statusCode: 200,
      message: 'Filtro administrativo de categorías aplicado correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management')
  async findAllManagement(
    @Query() paginationManagementDto: PaginationManagementDto,
  ) {
    const data = await this.categoryService.findAllManagement(paginationManagementDto);
    return {
      statusCode: 200,
      message: 'Categorías administrativas listadas correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management/:id')
  async findByIdManagement(@Param('id', ParseMongoIdPipe) id: string) {
    const data = await this.categoryService.findByIdManagement(id);
    return {
      statusCode: 200,
      message: 'Categoría administrativa obtenida correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const data = await this.categoryService.updateById(id, updateCategoryDto);
    return {
      statusCode: 200,
      message: 'Categoría actualizada correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const data = await this.categoryService.create(createCategoryDto);
    return {
      statusCode: 200,
      message: 'Categoría creada correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseMongoIdPipe) id: string) {
    const data = await this.categoryService.delete(id);
    return {
      statusCode: 200,
      message: 'Categoría eliminada correctamente',
      data,
    };
  }
}
