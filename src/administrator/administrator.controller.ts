import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';

@Controller('administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post()
  async create(@Body() createAdministratorDto: CreateAdministratorDto) {
    const data = await this.administratorService.create(createAdministratorDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Administrador creado correctamente',
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.administratorService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Administradores listados correctamente',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.administratorService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Administrador obtenido correctamente',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdministratorDto: UpdateAdministratorDto,
  ) {
    const data = await this.administratorService.update(+id, updateAdministratorDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Administrador actualizado correctamente',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.administratorService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Administrador eliminado correctamente',
      data,
    };
  }
}
