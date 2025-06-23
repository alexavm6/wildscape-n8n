import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '@user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);
    return {
      statusCode: 200,
      message: 'Inicio de sesión exitoso',
      data,
    };
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const data = await this.authService.signup(createUserDto);
    return {
      statusCode: 200,
      message: 'Usuario registrado correctamente',
      data,
    };
  }
}
