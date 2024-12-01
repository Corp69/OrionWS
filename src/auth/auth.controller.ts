import { Controller, Get, Post, Body, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';

import { AuthService } from './auth.service';
import { RawHeaders, GetUser, Auth } from './decorators';
import { RoleProtected } from './decorators/role-protected.decorator';

import { CreateUserDto, LoginUserDto } from './dto';
import { Users } from './entities/users.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Auth - Modulo Authenticacion.')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  
  @Post('register')
  @ApiResponse({ status: 200, description: 'OrionWS - Peticion Exitosa!' })
  @ApiResponse({ status: 404, description: 'OrionWS - Ruta Deshabilitada' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create( createUserDto );
  }   

  @Post('login')
  loginUser(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login( LoginUserDto );
  }   





}
