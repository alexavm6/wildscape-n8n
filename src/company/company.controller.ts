import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseFilters,
  HttpStatus,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { ParseMongoIdPipe } from '@common/pipes/parse-mongo-id.pipe';
import { Roles } from '@auth/decorators/roles.decorator';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';

@Controller('company')
@UseFilters(HttpExceptionFilter)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  /*
    para: administrador
  */
  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management')
  async findAllManagement() {
    const data = await this.companyService.findAllManagement();
    return {
      statusCode: HttpStatus.OK,
      message: 'Empresas listadas correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management/:id')
  async findByIdManagement(@Param('id', ParseMongoIdPipe) id: string) {
    const data = await this.companyService.findByIdManagement(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Empresa obtenida correctamente',
      data,
    };
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const data = await this.companyService.updateById(id, updateCompanyDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Empresa actualizada correctamente',
      data,
    };
  }
}
