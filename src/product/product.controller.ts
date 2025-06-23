import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationSearchProductDto } from './dto/pagination-search-product.dto';
import { PaginationManagementProductDto } from './dto/pagination-management-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const data = await this.productService.findAll(paginationDto);
    return { statusCode: 200, message: 'Productos listados correctamente', data };
  }

  @Get('filter')
  async findAllFilter(@Query('name') name?: string) {
    const data = await this.productService.findAllFilter(name);
    return { statusCode: 200, message: 'Filtro aplicado correctamente', data };
  }

  @Get('search')
  async findAllSearch(@Query() dto: PaginationSearchProductDto) {
    const data = await this.productService.findAllSearch(dto);
    return { statusCode: 200, message: 'Búsqueda realizada correctamente', data };
  }

  @Roles(Role.Administrator, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  async findByUserId(@Req() req: any, @Query() paginationDto: PaginationDto) {
    const data = await this.productService.findByUserId(req.user, paginationDto);
    return { statusCode: 200, message: 'Productos del usuario listados correctamente', data };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management-filter')
  async findAllManagementFilter(@Query('name') name?: string) {
    const data = await this.productService.findAllManagementFilter(name);
    return { statusCode: 200, message: 'Filtro administrativo aplicado correctamente', data };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management')
  async findAllManagement(@Query() dto: PaginationManagementProductDto) {
    const data = await this.productService.findAllManagement(dto);
    return { statusCode: 200, message: 'Productos administrativos listados correctamente', data };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management/:id')
  async findByIdManagement(@Param('id', ParseMongoIdPipe) id: string) {
    const data = await this.productService.findByIdManagement(id);
    return { statusCode: 200, message: 'Producto administrativo obtenido correctamente', data };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    const data = await this.productService.updateById(id, dto);
    return { statusCode: 200, message: 'Producto actualizado correctamente', data };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreateProductDto) {
    const data = await this.productService.create(dto);
    return { statusCode: 200, message: 'Producto creado correctamente', data };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseMongoIdPipe) id: string) {
    const data = await this.productService.delete(id);
    return { statusCode: 200, message: 'Producto eliminado correctamente', data };
  }

  @Get(':id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    const data = await this.productService.findById(id);
    return { statusCode: 200, message: 'Producto obtenido correctamente', data };
  }
}
